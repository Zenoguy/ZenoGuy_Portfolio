export interface GitHubRepo {
  name: string;
  description: string | null;
  url: string;
  homepageUrl: string | null;
  languages: {
    nodes: {
      name: string;
    }[];
  };
  repositoryTopics: {
    nodes: {
      topic: {
        name: string;
      };
    }[];
  };
}

interface GitHubDataResponse {
  pinnedRepos: GitHubRepo[];
  publicRepos: GitHubRepo[];
}

export async function getGitHubData(): Promise<GitHubDataResponse | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    console.warn("GITHUB_TOKEN is not defined in environment variables. Falling back to static data.");
    return null;
  }

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: `
          query {
            viewer {
              pinnedItems(first: 6, types: REPOSITORY) {
                nodes {
                  ... on Repository {
                    name
                    description
                    url
                    homepageUrl
                    languages(first: 3, orderBy: { field: SIZE, direction: DESC }) {
                      nodes {
                        name
                      }
                    }
                    repositoryTopics(first: 10) {
                      nodes {
                        topic {
                          name
                        }
                      }
                    }
                  }
                }
              }
              repositories(first: 20, privacy: PUBLIC, orderBy: { field: UPDATED_AT, direction: DESC }) {
                nodes {
                  name
                  description
                  url
                  homepageUrl
                  languages(first: 5, orderBy: { field: SIZE, direction: DESC }) {
                    nodes {
                      name
                    }
                  }
                  repositoryTopics(first: 10) {
                    nodes {
                      topic {
                        name
                      }
                    }
                  }
                }
              }
            }
          }
        `,
      }),
      // Revalidate cache every hour in production
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      console.error(`Failed to fetch GitHub data: ${response.statusText}`);
      return null;
    }

    const json = await response.json();
    if (json.errors) {
      console.error("GraphQL Errors fetching GitHub data:", json.errors);
      return null;
    }

    const pinnedNodes = json.data?.viewer?.pinnedItems?.nodes || [];
    const publicNodes = json.data?.viewer?.repositories?.nodes || [];

    return {
      pinnedRepos: pinnedNodes as GitHubRepo[],
      publicRepos: publicNodes as GitHubRepo[],
    };
  } catch (error) {
    console.error("Error fetching GitHub data:", error);
    return null;
  }
}

// Keep the old function signature for compatibility/simplicity if needed, wrapping the new unified caller
export async function getPinnedRepos(): Promise<GitHubRepo[] | null> {
  const data = await getGitHubData();
  return data ? data.pinnedRepos : null;
}
