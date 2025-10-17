---
id: edit_job
title: Modify Subscription
---

BladePipe supports modifying subscriptions for DataJob, currently only for DataJob in Incremental step.

## Procedure
1. Select the DataJob you want to modify and enter the DataJob Details page.
2. Click **Functions** > **Modify Subscription** in the upper-right corner of the page.

3. The original DataJob configuration will be displayed in the Modify Subscription process. You can now make modifications by adding, deleting, or modifying the original subscriptions. The modified items will be color-coded: **Red for deletions, green for additions, and orange for modifications**.

4. In the last step **Modification Confirmation**, you can choose whether to perform a **Full Data Initialization** at the bottom of the page. By default, it is selected. If it is not selected, the new subscribed database and table columns will not be fully initialized and will proceed directly to Incremental data synchronization.
   
5. Confirm the modification content, click **Modify Subscription**, and the DataJob will be successfully submitted.

6. If you only modify or delete subscriptions, the original DataJob configuration will be modified directly and it will continue to run normally.    
If you add databases, tables, or columns, a related DataJob will be generated and run separately. When the delay for both the main DataJob and associated DataJob is eliminated, the DataJobs will automatically merge into one and restart.

