const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');

const client = new SecretManagerServiceClient();

(async () => {
  if (!process.env.PROJECT_ID) {
    return;
  }

  const [secretsList] = await client.listSecrets({
    parent: `projects/${process.env.PROJECT_ID}`,
  });

  let dotenv = '';

  for (const secret of secretsList) {
    const key = secret.name.split('/').pop();
    const [version] = await client.accessSecretVersion({
      name: secret.name + '/versions/latest',
    });

    const value = version.payload.data.toString();

    dotenv += `${key}=${value}\n`;
  }

  require('fs').writeFileSync('.env', dotenv);
})();
