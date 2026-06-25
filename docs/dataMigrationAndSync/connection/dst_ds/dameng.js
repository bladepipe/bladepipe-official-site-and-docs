export const Dameng = {
    prepare: [
        {
            key: 'Accounts and Permissions',
            desc: 'Documentation: [Permissions Required for Dameng](../../datasource_func/Dameng/privs_for_dameng)'
        },
        {
            key: 'Network Preparation',
            desc: 'The sidecar node must be able to connect to the standard interactive interface of Dameng (e.g., 5432).'
        }
    ],
    params: [
        {
            key: 'keyConflictStrategy',
            desc: 'Policy for primary key conflicts during incremental writes:' +
                '<ul>' +
                '  <li><b>IGNORE</b> Ignore conflicts (default)</li>' +
                '  <li><b>REPLACE</b> Replace on conflicts (optional)</li>' +
                '</ul>'
        },
        {
            key: 'dstWholeReplace',
            desc: 'Convert INSERT and UPDATE operations into full-row replacement on the target.'
        },
        {
            key: 'writeStrategy',
            desc: 'Target write strategy, including:' +
                '\n- <b>ROW (Single row)</b>' +
                '\n- <b>MULTI_SQL (Multi-statement SQL)</b>' +
                '\n- <b>BATCH (Batch write, default option)</b>'
        },
    ],
    master_function: [
        {
            key: 'Clear Target Data Before Full Migration',
            desc: 'Clear old data before running the full migration task, triggered by manual reruns or scheduled full migrations.'
        },
        {
            key: 'Rebuild Target Table',
            desc: 'Rebuild the target table before running the full migration task, triggered by manual reruns or scheduled full migrations.'
        },
        {
            key: 'Incremental Write Conflict Strategy',
            desc: '<b>IGNORE</b>: Ignore primary key conflicts (no write), <b>REPLACE</b>: Replace the entire row on primary key conflicts.'
        },
        {
            key: 'Zero-Value Time Handling',
            desc: 'Support setting zero-value timestamps to different types of values to prevent errors when writing to the target.'
        },
    ]
}
