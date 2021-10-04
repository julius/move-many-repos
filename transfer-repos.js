const { Octokit } = require('@octokit/rest');
const credentials = require('./credentials');

const octokit = new Octokit({
    auth: credentials.githubToken,
});

(async () => {
    let allRepos = [];

    for (let page = 1; page < 100; page++) {
        const repos = (
            await octokit.request('GET /orgs/mmpro/repos', {
                org: 'mmpro',
                page,
                per_page: 50,
                type: 'all',
            })
        ).data;

        console.log(
            'repos',
            repos.map((r) => r.name),
            repos.length,
            page,
        );

        if (repos.length === 0) break;

        allRepos = allRepos.concat(repos);
    }

    console.log('allRepos', allRepos.length);

    // for (let i = 0; i < allRepos.length; i++) {
    //     await octokit.request(`POST /repos/mmpro/${allRepos[i].name}/transfer`, {
    //         owner: 'mmpro',
    //         repo: allRepos[i].name,
    //         new_owner: 'admiralcloud',
    //     });

    //     await new Promise((res) => setTimeout(res, 500));
    // }
})();
