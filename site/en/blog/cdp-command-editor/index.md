---
layout: "layouts/blog-post.njk"
title: Craft your Chrome Devtools Protocol (CDP) commands efficiently with the new command editor 
authors:
 - hadrijau
description: >
 To make it easier to type Chrome Devtools Protocol (CDP) commands, DevTools introduced a new user-friendly editor so that you don't have to use JSON.
date:  2023-08-24
hero: 'image/NJdAV9UgKuN8AhoaPBquL7giZQo1/rdTsT4xLywawzS9aVQdR.jpg'
alt: 'Craft your CDP commands with the new editor.'
tags:
    - devtools-engineering
    - devtools
---

<!--header banner, do not remove-->
{% Partial 'devtools/banner.md' %}

[Chrome DevTools Protocol (CDP)](https://chromedevtools.github.io/devtools-protocol/) is a remote debugging protocol (API) that lets developers communicate with a running Chrome browser. Chrome DevTools uses CDP to help you inspect the browser's state, control its behavior, and collect debugging information. You can also build Chrome extensions that use CDP. 

For example, this is a CDP command that  inserts a new rule with the given `ruleText` in a stylesheet with given `styleSheetId`, at the position specified by `location`.


```js
{ 
    command: 'CSS.addRule', 
    parameters: {
        styleSheetId: '2',
        ruleText:'Example', 
        location: {
            startLine: 1,
            startColumn: 1,
            endLine: 1,
            endColumn: 1
        }
    }
}
```

The [Protocol monitor](/blog/new-in-devtools-92/#protocol-monitor) drawer tab provides you with a way to send CDP requests and view all the CDP requests and responses DevTools sends and receives.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/eRbncSjMieLuViSCDUwq.png", alt="The command line bar at the bottom of Protocol monitor.", width="800", height="504" %}

Previously it was difficult to craft the command by hand, especially a command with many parameters. Not only did you need to be mindful of opening and closing brackets and quotation marks, you also had to remember the command's parameters which, in turn, makes you look up the [CDP documentation](https://chromedevtools.github.io/devtools-protocol/).

To solve this problem, DevTools introduced a new CDP editor whose main goals are to:

- **Auto-complete commands**. Simplify your CDP command input by providing you with the list of available commands via an auto completion feature.
- **Auto-populate command parameters**. Reduce the need to check the CDP documentation for the list of available command parameters.
- **Simplify the typing of parameter**. You just have to fill in the values of the parameters you want to send.
- **Edit and resend**. Improve prototyping speed by making it quicker to modify a CDP command.

Now, let's have a look at what this new editor offers, and how you can make use of it! 

## Autocompletion feature

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/EuJUlPz9xkUJvAqBzshK.png", alt="The autocompletion drop-down menu.", width="800", height="535" %}

An auto completion feature now powers the command input bar. It helps you write the names of the CDP commands you have access to. This can be very handy for commands that don't accept parameters.

## String and number parameters

With this new editor, you can now easily edit the values of primitive parameters. To open the editor, click the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/H4duJWlMkdd1903sC0Bw.svg", alt="Open left panel.", width="20", height="20" %} icon next to the command input.

Once you enter the command name, the editor shows you the corresponding parameters automatically. You don't have to look up documentation to know what parameters go with what commands. Furthermore, the editor displays the parameters in a given order: the mandatory ones first (in red) and the optional ones next (in blue).

To add a value to an optional parameter, hover over its name and click the `+` button. To reset the parameter to undefined, click the **Reset to default value**  button.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/G41qHOdmuIQf96Ogsldv.png", alt="The + and 'Reset to default value' buttons.", width="800", height="535" %}

## Enum and boolean parameters

When editing enum or boolean parameters, you'll see a drop-down menu that provides a selection of potential values (for enums) or the straightforward true or false option for booleans. This feature reduces the possibility of typing the wrong value for enum parameters and maintains accuracy and simplicity.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/1Othh7taZZ4MlbQ7KBZd.png", alt="The boolean and enum drop-down menus.", width="800", height="457" %}

## Array parameters

For array parameters, you can manually add values to the array. Hover over the parameter's row and click the `+` button.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/KmPRLFeC3crtueTne40S.png", alt="The + button that adds an array item.", width="800", height="535" %}

To delete array items one by one, click the bin button next to the items. You can also clear all the parameters from the array with the block button. In this case, the array parameter is reset to `[]`. 

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/WVdAIEPFTqwH9jnUSAFE.png", alt="The 'Delete parameter' and 'Reset to default' buttons.", width="800", height="535" %}

## Object parameters

When you enter a command that accepts object parameters, the editor lists the keys of this object and you can edit their values directly. This works for all types of nested parameters.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/O9VSKDH9ENYv9aWW1igP.png", alt="Nested parameters.", width="800", height="564" %}

## Discover what the command and parameters do in the editor

Were you ever uncertain about the purpose of a parameter or command? Now, you can hover over a command or parameter, and a descriptive tooltip will pop up, complete with a link to the online documentation.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/1aIyonSFctdZrbdSrpES.png", alt="The descriptive tooltip that appears when you hover over a command.", width="800", height="468" %}

## Be warned before sending incorrect parameters

Previously, if you didn't know if a parameter's value was of the correct type and had to wait to read the error response, this new editor is for you. It shows you real-time errors if the parameter can't accept the value you entered.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/xUAwWfx2v1On7mxgfqCn.png", alt="An error icon next to a parameter with an incorrect value.", width="800", height="468" %}

## Resend a command 

If you need to tweak a parameter of the command you just sent, you don't have to type it again. To edit and resend the command, right-click an item in the datagrid and select **Edit and resend** from the drop-down menu. This will automatically reopen the CDP editor and prefill it with the command you selected.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/XTmr9IHseehMDsq3Ts2K.png", alt="The drop-down menu of a command in the datagrid with the 'Edit and resend' option.", width="800", height="468" %}

## Copy a command to JSON format 

To copy the CDP command in JSON format to your clipboard, click the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/ZYotGnpXcKxDQmRQRq59.svg", alt="Copy.", width="24", height="24" %} copy icon at the leftmost end of the toolbar. Additionally, keep in mind that if you input a command directly into the input bar, it will seamlessly populate the editor, and the other way around.

##  Conclusion

The DevTools team's goal behind the design of this new CDP editor was to simplify the typing of CDP commands. The new editor can also be used to view parameters alongside the documentation and to provide you with an easier way to send your CDP commands.


<!--footer message, do not remove-->
{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/engineering-blog.md' %}
