---
layout: "layouts/doc-post.njk"
title: "View Web SQL Data With Chrome DevTools"
authors:
  - kaycebasques
date: 2019-03-25
updated: 2020-07-10
description: "How to view Web SQL data from the Application panel of Chrome DevTools."
---

!!!.aside.aside--warning

The Web SQL specification is [not being maintained][1] .

!!!

This guide shows you how to use [Chrome DevTools][2] to inspect Web SQL data.

## View Web SQL Data {: #view }

1.  Click the **Sources** tab to open the **Sources** panel. The **Manifest** pane usually opens by
    default.

    ![The Manifest pane.](/web/tools/chrome-devtools/storage/imgs/manifest.png)

    **Figure 1**. The Manifest pane.

2.  Expand the **Web SQL** section to view databases and tables. In **Figure 2** below
    **html5meetup** is a database and **rooms** is a table.

    ![The Web SQL pane.](/web/tools/chrome-devtools/storage/imgs/websql.png)

    **Figure 2**. The Web SQL pane.

3.  Click a table to view that table's data.

    ![Viewing the data of a Web SQL table.](/web/tools/chrome-devtools/storage/imgs/websqltable.png)

    **Figure 3**. Viewing the data of the **rooms** Web SQL table.

## Edit Web SQL data {: #edit }

You can't edit Web SQL data when viewing a Web SQL table, such as in **Figure 3** above. But you can
run statements from the Web SQL Console that edit or delete tables. See [Run Web SQL queries][3].

## Run Web SQL queries {: #run }

1.  Click a database to open a console for that database.
2.  Type a Web SQL statement, then press Enter to run it.

    ![Using the Web SQL Console to delete a row from a table.](/web/tools/chrome-devtools/storage/imgs/websqledit.png)

    **Figure 4**. Using the Web SQL Console to delete a row from the **rooms** table.

## Refresh a Web SQL table {: #refresh }

DevTools does not update tables in real-time. To update the data in a table:

1.  [View a Web SQL table's data][4].
2.  Click **Refresh** ![Refresh](/web/tools/chrome-devtools/images/shared/reload.png).

## Filter out columns in a Web SQL table {: #filter }

1.  [View a Web SQL table's data][5].
2.  Use the **Visible columns** text box to specify what columns you want to show. Provide the
    column names as a CSV list.

    ![Using the Visible Columns text box to reduce the number of columns shown.](/web/tools/chrome-devtools/storage/imgs/websqlfilter.png)

    **Figure 5**. Using the **Visible Columns** text box to only show the `room_name` and
    `last_updated` columns.

## Delete all Web SQL data {: #delete }

1.  Open the **Clear Storage** pane.
2.  Make sure that the **Web SQL** checkbox is enabled.

    ![The Web SQL checkbox.](/web/tools/chrome-devtools/storage/imgs/websqlcheckbox.png)

    **Figure 6**. The **Web SQL** checkbox.

3.  Click **Clear site data**.

    ![The Clear Site Data button.](/web/tools/chrome-devtools/storage/imgs/clearwebsql.png)

    **Figure 7**. The **Clear Site Data** button.

[1]: https://www.w3.org/TR/webdatabase/#status-of-this-document
[2]: /web/tools/chrome-devtools
[3]: #run
[4]: #view
[5]: #view
