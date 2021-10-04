const { Octokit } = require('@octokit/rest');
const credentials = require('./credentials');

const octokit = new Octokit({
    auth: credentials.githubToken,
});

(async () => {
    for (let page = 1; page < 100; page++) {
        const repos = (
            await octokit.request('GET /orgs/mmpro/repos', {
                org: 'mmpro',
                page,
                per_page: 50,
                type: 'all',
            })
        ).data;

        repos.forEach((r) => console.log(r.name));

        if (repos.length === 0) break;
    }
})();
