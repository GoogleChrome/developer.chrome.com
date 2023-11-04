---
layout: 'layouts/blog-post.njk'
title: Chrome DevTools November digest
authors:
  - deannarubin
date: 2013-11-27
#updated: 2014-07-04
---

Chrome DevTools moves fast and we wanted to call your attention to some new 
functionality and improvements we've introduced to a few components. Namely, 
we're going to talk about some UI changes, high-resolution JS profiling and new 
Workspaces features.


- High-resolution profiling now goes to .1 millisecond precision
- Toolbars rose to the top of Devtools and Overrides moved to the console drawer
- Workspaces added several features to support adding/removing/searching files


## High-Resolution Profiling

[CPU profiling](https://developers.google.com/chrome-developer-tools/docs/cpu-profiling) 
is a pretty useful feature for seeing how efficient your Javascript is.  In 
addition to the traditional profile views, we introduced a [Flame Chart](https://developers.google.com/chrome-developer-tools/docs/flame-chart) 
this summer, which visually represents a page's Javascript processing over time. 
 It can be used to easily view how deep your call stack is going as well as how 
long the individual functions take to process.

Until recently, both the traditional Heavy (bottom up) and Tree (top down) 
representations, as well as the Flame Chart, would only show processes down to 1 
millisecond precision.  For most applications, this is fine.  However, if you 
are working on something where speed really matters in the UI, like a game -- 1 
millisecond resolution may be too chunky to get meaningful results for what is 
causing your site to be slow or for your UI to seem laggy.
To enable High Resolution Profiling (currently Canary only):


1. Open DevTools Settings.
1. On the **General** tab, under **Profiler**, turn on **High resolution CPU 
profiling**.


Here's an example of a Flame Chart seen in normal profiling and with high 
resolution, where we profile loading the HTML5Rocks.com home page:

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/YvMknAz7qExdrwDpMv1d.png", alt="Flame chart with normal resolution.", width="800", height="457" %}
</figure>

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/Ou9QSuYbcBc1vuvNG5x1.png", alt="Flame chart with high resolution.", width="800", height="486" %}
</figure>

With normal profiling resolution, process time always gets rounded up to the 
next millisecond, so a process that only takes 0.1 milliseconds or less still 
gets reported as taking 1.0 milliseconds, and other processes might not get 
shown at all in the call stack.

High-resolution profiling has a large overhead in the Javascript VM, which is 
why it is turned off by default.  While it certainly looks cooler than normal 
profiling resolution, we recommend only using it if you really need the 
precision.

## Devtools UI Improvements

While there are always new things being rolled out in Canary, we wanted to call 
your attention to a few major UI changes: Buttons rising to the top of the UI in 
general, the Timeline navigation and information panels, and the relocation of 
Overrides to the Console Drawer.


First, let's take a look at where we're coming from.  Because we're talking 
about Timeline anyway, I'll try to kill the first two birds with one pair of 
screenshots.  Here's what Timeline looks like in Chrome (stable) right now: 

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/d6PatKNym0jlONWGVr2i.png", alt="Old timeline.", width="800", height="448" %}
</figure>

And here's what Timeline looks like now. 

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/g6yAcsAxWAIXMnXHpzwe.png", alt="New timeline.", width="800", height="447" %}
</figure>

Notice the following things:


1. The toolbars and buttons are all at the top of the screen now, both for the 
specific Timeline ones on the left and the general DevTools ones on the 
right.
1. The Timeline records now have their nesting structure in the panel to the 
left, and you can even use the keyboard to scroll through them.  In addition 
to using up and down keys to scroll up and down, you can also use the left 
and right keys to open and close nested records.
1. Time details are now displayed in a panel on the right for whichever entry 
you've selected.  (You can also hover over other entries to get their 
information.)


Now let's take a look at the console drawer.  To open the console drawer, press 
Escape from within DevTools or hit the console drawer button 
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/7Y5eITNl8gLKvmrvDjwU.png", alt="Drawer Icon", width="28", height="24" %}
and the
drawer rolls up from the bottom.

By default, you will have **Console** and **Search** tabs there.  To get to the 
functionality formerly known as Overrides, open the DevTools settings and check 
the box next to "Show 'Emulation' view in console drawer".  Close the settings 
box and you will have an **Emulation** tab in the console drawer like the screenshot 
here:

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/IiskzY32UcPwWTYSPoV7.png", alt="Console drawer and overrides.", width="800", height="351" %}
</figure>

And you can do all of your emulation there.

The reason for this change is that before, you would have to go in and out of 
Settings to change your emulation overrides, and then go back and view your 
page.  Now you can change around your emulation overrides while still 
manipulating styles.  

## Improved Workspaces

Workspaces in particular is a feature that can simplify your authoring workflow 
quite a bit, and yet it doesn't get nearly as much love as it deserves.  With 
Workspaces, rather than experimenting and making changes in DevTools and having 
to copy and paste your changes back to your source files, you can make changes 
in DevTools, see them rendered in the browser, and save them to a persistent 
local version of your files -- all without leaving Chrome.  


If you haven't read the [Chrome Developer Tools Revolutions 2013](http://www.html5rocks.com/en/tutorials/developertools/revolutions2013/)
article yet, go ahead and take a look at that and then come back here to learn 
how we've improved on those features in the last few months.

### Adding Files Easier

Back at the time of the Revolutions 2013 article, [creating a new 
workspace](http://www.html5rocks.com/en/tutorials/developertools/revolutions2013/#toc-adding-workspace)
required adding the folder to your workspaces and then mapping the folder to a 
network resource.  We've simplified this process to a single step: Simply 
right-click in the left panel of Sources and select **Add Folder to Workspace**. 
 This launches you into a file dialog where you can choose a new folder to add 
to your Workspaces.  (It does __not__ add the currently highlighted folder to your 
Workspaces.) 

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/BVHD8ZNafrCkJNYW6Y4p.jpg", alt="Add folder to workspace.", width="720", height="300" %}
</figure>


### Creating and Removing Files

You can add new files to the local directory you're using for Workspaces within 
Workspaces itself now.  Simply right-click on a folder in the left Sources panel 
and select **New File.**

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/VifUNdvvgkPJnJF3PLgW.png", alt="New file.", width="800", height="321" %}
</figure>

You can also remove files from within Workspaces.  Right-click on a file in the 
left Sources panel and select **Delete File.**

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/Y9dlMzXNOg6RvBWyh61x.png", alt="Remove file.", width="800", height="368" %}
</figure>

You can also duplicate a file by selecting **Duplicate File**.

### Refresh

Now that you can create new files (or delete files) directly in workspaces, the 
Sources directory will also automatically refresh and show these new files.  If 
not, you can always right-click on a folder and select **Refresh** from the 
pop-up menu to force a refresh.

This is also useful if you happen to change your files open in another editor 
and want the changes to show up in DevTools.

### Search Across Files

We've refined the interface for searching across files a little bit, and now you 
can also search for strings across all of the files in your workspaces as well 
as all of the files loaded into DevTools.  You can either search for a string or 
for a regular expression, and we match every occurrence in every file or page.
To search multiple files in Workspaces (currently in Canary):


- Open the console drawer by pressing the Escape key, and click the **Search** 
tab next to **Console** to open the Search window

OR

  Press `Ctrl + Shift + F` (`Cmd + Opt + F` on Mac) to open the Search window.

- Type your query into the **Search Sources** box, and hit Enter.  If your 
query is a regular expression or needs to be case-insensitive, click the 
appropriate box.


<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/6wxhg3oZbhRtqzLn7xk7.png", alt="Search across files.", width="735", height="357" %}
</figure>

### Ignore Lists

Searching through the text of files or filtering through filenames 
can get very tedious if you have a ton of .git files or README.md files 
cluttering up your results.

Thus, we've added an ignore list feature into Workspaces so you can exclude 
certain file types or folders when viewing and searching your workspace.

Here's how you can view and change the current shared ignorelist in Workspaces:


1. Open DevTools **Settings**.
1. Click **Workspace**.
1. Under **Common**, within the **Folder exclude pattern** box, you can view 
and/or edit the patterns.


<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/W1OYbLxkao3kKRL3uP57.png", alt="Exclude file patterns.", width="779", height="334" %}
</figure>

We ship with these default global exclude patterns:

{% Aside %}
  /.git/|/.sass-cache/|/.hg/|/.idea/|/.svn/|/.cache/|/.project/|/.DS__Store$|/.Trashes$|/.Spotlight-V100$|/.AppleDouble$|/.LSOverride$|/Icon$|/.__.*$
{% endAside %}

This regex excludes metadata from Git, SVN, Mercurial, project files from 
Eclipse and IntelliJ, OS X DS_Store and Trash files, and a few other things 
worth ignoring like cache from Sass. Their entire folder, including any children 
are excluded from the UI to not show up in the UI and to not show up when 
searching through files. 

#### Workspace-specific Ignore Lists

To get more specific, you can also choose to exclude files and folders inside 
your particular workspace to reduce clutter in searches.  Excluded folders will 
not show up in the sources directory either.

To exclude an entire folder from your workspace, right-click on the folder in 
the left Sources panel and select **Exclude Folder.**
To see the mappings and excluded folders for a given workspace folder:


1. Open the DevTools Settings.
1. Click **Workspace**.
1. Highlight the folder you're interested in.  
1. Click **Edit** and the "Edit file system" window appears; you can add or 
remove mappings and/or excluded folders from this window.


<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/XW6SE6bnuTjEDHnncB7t.png", alt="Exclude folders.", width="800", height="274" %}
</figure>


