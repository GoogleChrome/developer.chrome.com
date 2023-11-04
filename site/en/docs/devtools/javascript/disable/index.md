---
layout: "layouts/doc-post.njk"
title: "Disable JavaScript"
authors:
  - kaycebasques
  - sofiayem
date: 2019-01-31
updated: 2022-12-13
description: "Open the Command Menu and run the Disable JavaScript command."
---

To see how a web page looks and behaves when JavaScript is disabled:

1.  [Open Chrome DevTools][1].
1.  Depending on your operating system, press one of the following:

    - On Window or Linux, <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>
    - On MacOS, <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>

    {% Img src="image/admin/iGnR09vHOtXYztNupYUU.png", alt="The Command Menu.", width="800", height="632" %}

    The **Command Menu** opens.

1.  Start typing `javascript`, select **Disable JavaScript**, and then press Enter to run the
    command. JavaScript is now disabled.

    {% Img src="image/admin/v5K0a7jgtCbS9R18Vf6j.png", alt="Selecting 'Disable JavaScript' in the Command Menu.", width="800", height="464" %}

To remind you that JavaScript is disabled, Chrome shows the corresponding {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/SLXe2Th4LGAg34pe6CPj.png", alt="Disabled JavaScript.", width="22", height="20" %} icon in the address bar and DevTools shows a warning {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/BOj6neshf7WbowM3j21R.svg", alt="Warning.", width="22", height="22" %} icon next to **Sources**.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/MeeQhKyCdJ11EC26pU2j.png", alt="An icon in the address bar and a warning icon next to Sources in DevTools.", width="800", height="475" %}

JavaScript will remain disabled in this tab so long as you have DevTools open.

You may want to reload the page to see if and how the page depends on JavaScript while loading.

Alternatively, you can disable JavaScript in {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="22", height="22" %} [Settings](/docs/devtools/settings/#debugger).

To re-enable JavaScript:

- Open the Command Menu again and run the **Enable JavaScript** command.
- Close DevTools.

[1]: /docs/devtools/open
