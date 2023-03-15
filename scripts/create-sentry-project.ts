const SENTRY_API_KEY =
  '46cde180340d467a9c339ba1b826b8a1e8eee2ea2b76407cb8b6bb9a37773af6'
const ORG_SLUG = 'tichopad'
const TEAM_SLUG = 'michael-tichopad'

const fetchSentry = (
  path: string,
  method: 'GET' | 'POST' | 'PUT' = 'GET',
  body?: Record<string, any>,
) => {
  return fetch(`https://sentry.io/api/0/${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${SENTRY_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  }).then((response) => response.json())
}

const createProject = async (projectName: string, platform: string) => {
  // Create project
  const project = await fetchSentry(
    `teams/${ORG_SLUG}/${TEAM_SLUG}/projects/`,
    'POST',
    { name: projectName },
  )

  // Add platform to it
  const updatedProject = await fetchSentry(
    `projects/${ORG_SLUG}/${projectName}/`,
    'PUT',
    { platform },
  )

  // Get its DSN client key
  const keyData = await fetchSentry(`projects/${ORG_SLUG}/${projectName}/keys/`)
  const dsn = keyData[0].dsn.public

  return {
    projectName,
    dsn,
  }
}

const projectsToCreate = [
  { name: 'graphql-api', platform: 'node-awslambda' },
  { name: 'greeter-api', platform: 'node-awslambda' },
]

const resultsPromises = projectsToCreate.map(({ name, platform }) =>
  createProject(name, platform),
)
Promise.all(resultsPromises).then((result) => {
  console.log(result)
})
