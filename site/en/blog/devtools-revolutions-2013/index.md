---
layout: 'layouts/blog-post.njk'
title: Chrome DevTools Revolutions 2013
authors:
  - arthurevans
  - timstatler
date: 2013-07-12
updated: 2013-10-29
---

## Introduction


As the complexity and functionality of web applications has grown, so has Chrome DevTools. In this recap of Paul Irish's Google I/O 2013 talk [Chrome DevTools Revolutions 2013](https://www.youtube.com/watch?v=x6qe_kVaBpg), you get a look at the latest features that are revolutionizing how you build and test web applications. 

{% YouTube id="x6qe_kVaBpg" %}

If you missed Paul's talk, you can catch it above (go ahead, we'll wait) or you can cut straight to the feature roundup:


- Workspaces lets you use DevTools as your source code editor.
- If you use Sass, you'll love the ability tolive-edit Sass (.scss) files within DevTools and see your changes immediately reflected on the page.
- Remotely debugging pages on Chrome for Android has been possible for a while, but the ADB extension makes connecting to Android devices simpler. Reverse port forwarding lets you easily connect to localhost on your development machine from your device.
- Performance is always a concern in web applications, and DevTools has a number of new features to help you track down bottlenecks, including the new Flame Chart visualization for CPU profiling and several new tools for debugging performance problems related to rendering and memory use.


These features are live in Chrome 28, now available in the stable update channel.


## Workspaces

Workspaces let you map resources served from a local web server to files on disk, so you can edit any type of source file within the Sources panel and have those changes persist to disk. Similarly, changes you make in your external editor immediately appear in the Sources panel. 

The screenshot below shows an example of workspaces in action. The Calendar site has been loaded over localhost, while the Sources panel shows the local file system view of the site's root folder. Edits you make to the files in this folder are persisted to disk. In the screenshot below, some unsaved changes have been made to Calendar.css, so an asterisk is placed next to the file name.

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/EU9UcWH2U5b74G1Wvhvl.png", alt="Sources panel.", width="552", height="327" %}
</figure>

Pressing `Control+S` or `Command+S` persists the changes to disk. 

Similarly, changes you make to an element's styles in the Elements panel are reflected in both the Sources panel and your external editor. Note that:

- DOM changes in the Elements panel are __not__ persisted. Only style changes on the Elements panel are persisted.
- Only styles defined in an external CSS file can be changed. Changes to element.style or to inline styles are not persisted back to disk. If you have inline styles, they can be changed on the Sources panel.
- Style changes on the Elements panel are persisted immediately; you don’t need to press `Control+S` or `Command+S`.

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/vjOjXz9uYlmUgMgtEKve.png", alt="Elements panel.", width="620", height="225" %}
</figure>

### Adding a workspace folder

There are two parts to using workspaces: making a local folder's contents available to DevTools, and mapping that folder to a URL. 

To add a new workspace folder:

1. In DevTools, click **Settings** {% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/64uBaAhcX61YcVhJ0iwe.png", alt="Settings icon", width="17", height="17" %} to open DevTools Settings.
1. Click **Workspace**.
1. Click **Add Folder**.
1. Browse to the folder containing your project's source files and click **Select**.
1. When prompted, click **Allow** to allow DevTools full access to the folder.

The Sources panel displays the new workspace folder along with the sources loaded over localhost. You can now live-edit files within your workspace folder, and those changes will persist to disk.

<figure>
{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/QbVkzFOU1INzgUn9sGLy.png", alt="Sources panel showing both localhost resources and workspace files.", width="491", height="198" %}
</figure>

### Mapping a folder to a URL

Once you've added a workspace folder you can map it to a URL. Whenever Chrome loads the specified URL, the Sources panel displays the workspace folder contents in place of the network folder contents.

To map a workspace folder to a URL:

1. In the Sources panel, right-click or Control+click on a file in a workspace folder.
1. Select **Map to Network Resource**. <figure>{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/EkBwqFMwhRtb7x97FptW.png", alt="Context menu showing Map to Network Resource option", width="415", height="182" %}</figure>
1. Select the corresponding network resource from the currently loaded page. <figure>{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/p9cPoFMrHYDhElMpK4ic.png", alt="Resource selection dialog.", width="547", height="280" %}</figure>
1. Reload the page in Chrome.

The Sources panel should now show just the contents of your site's local workspace folder, not the localhost sources, as shown below. 

<figure>{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/KLIB2vv25pNGv2dXX11H.png", alt="Mapped workspace folder", width="462", height="189" %}</figure>

{% Aside %}
If you still see the localhost sources, refresh the page in Chrome.
{% endAside %}

There are two other ways to link a network folder to a workspace folder:

- Right-click (or Control+click) on a network resource and select **Map to File System Resource**.
- Add mappings manually in the Workspace tab of the DevTools Settings dialog.



##Sass/CSS Source Map debugging

Sass (CSS Source Map) debugging lets you live-edit Sass (.scss) files in the Sources panel, and view the results without having to leave DevTools or refresh the page. When you inspect an element whose styles are provided by a Sass-generated CSS file, the Elements panel displays a link to the .scss file, not the generated .css file.

<figure> {% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/kmgwW5KK1aZAjhDCna1E.png", alt="Elements panel showing .scss stylesheet", width="620", height="194" %}</figure>

Clicking the link opens the (editable) SCSS file in the Sources panel. You can make any changes you want to this file. 

<figure>{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/YoYKGQu3mYeyRF1eYRjk.png", alt="ources panel showing .scss file.", width="507", height="219" %}</figure>

When you save changes to an SCSS file (in DevTools or elsewhere), the Sass compiler re-generates the CSS files. Then DevTools reloads the newly generated CSS file.

{% Aside %}
Technically this feature should work with __any__ CSS preprocessor that supports source maps. For more information, read [working with CSS preprocessors](https://developers.google.com/chrome-developer-tools/docs/css-preprocessors) in the DevTools documentation.
{% endAside %}

### Using Sass debugging

To use Sass debugging in Chrome you need to have the [pre-release version of the Sass compiler](http://sass-lang.com/download.html), which is the only version that currently supports source map generation.

```shell
gem install sass -v '>=3.3.0alpha' --pre
```

You also need to enable the Sass debugging feature in DevTools experiments:


1. Open **about:flags** in Chrome.
1. Turn on **Enable Developer Tools experiments**.
1. Restart Chrome.
1. Open DevTools Settings and click **Experiments**.
1. Turn on **Support for Sass** (or **Sass stylesheet debugging**, depending on the browser version you're using).


Once Sass is installed, start the Sass compiler to watch for changes to your Sass source files and create source map files for each generated CSS file, for example: 

```shell
sass --watch **--sourcemap** sass/styles.scss:styles.css
```

If you are using Compass, note that Compass doesn’t yet support the pre-release version of Sass, so you can’t use Sass debugging with Compass.

### How it works

For each SCSS source file it processes, the Sass compiler generates a [source map](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/) file (.map file) in addition to the compiled CSS. The source map file is a JSON file that defines the mappings between the .scss file and the .css files. Each CSS file contains an annotation that specifies the URL of its source map file, embedded in a special comment:

```json
/*# sourceMappingURL=<url>; */
```

For instance, given the following SCSS file:

```css
<!-- styles.scss -->
$textSize: 26px;
$fontColor: red;
$bgColor: whitesmoke;

h2 {
    font-size: $textSize;
    color: $fontColor;
    background: $bgColor;
}
```

Sass generates a CSS file like this, with the sourceMappingURL annotation:

```css
<!-- styles.css -->
h2 {
  font-size: 24px;
  color: orange;
  background-color: darkblue; 
}
/*# sourceMappingURL=styles.css.map */
```

Below is an example source map file:

```json
{
  "version": "3",
  "mappings":"AAKA,EAAG;EACC,SAAS,EANF,IAAI;EAOX,KAAK..."
  "sources": ["sass/styles.scss"],
  "file": "styles.css"
}
```

## Easier remote debugging on Chrome for Android

A couple of new features in DevTools make remote debugging on Chrome for Android easier to setup: the ADB extension and reverse port forwarding. 

The ADB Chrome extension simplifies the process of setting up remote debugging. It provides the following benefits:

- Bundles Android Debug Bridge (ADB) so you don't have to install it.
- No command line interaction required.
- UI for easily starting and stopping the ADB daemon, and viewing connected devices.


Reverse port forwarding makes it easy to connect Chrome on Android to a web server running on your localhost, something that some network environments make difficult without some DNS tricks.

### Using the ADB extension

First, install the [ADB Chrome extension](https://chrome.google.com/webstore/detail/adb/dpngiggdglpdnjdoaefidgiigpemgage) from the Chrome Web Store. Click **Add to Chrome** to install the extension.

{% Aside %}
Installing extensions from the Chrome Web Store isn't supported on Windows 8. If you have any problems installing from the Chrome Web Store, see [Remote Debugging on Android](https://developers.google.com/chrome-developer-tools/docs/remote-debugging) for alternate installation instructions.
{% endAside %}

Once installed, a gray Android menu icon appears in Chrome. To start ADB, click the icon and then click **Start ADB**.

<figure>{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/ic5mhqFSPtA8u1b6j0Yu.png", alt="ADB extension menu.", width="153", height="108" %}</figure>

Once ADB has started, the menu icon turns green and displays the number of currently connected devices, if any.

<figure>{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/UpNgdLrrOfm7FITKkbzq.png", alt="ADB extension menu showing connected devices.", width="152", height="106" %}</figure>

Click **View Devices** to open the **about:inspect** page that displays each connected device and its tabs. To inspect a tab in DevTools, click the "inspect" link next to its URL.

<figure>{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/4EVWQHhAkKKsrS7Yd2Tu.png", alt="about:inspect page showing links for device tabs", width="593", height="214" %}</figure>

If you don't see any connected devices, check that your device is connected to USB, and that **USB debugging** is enabled in the Chrome for Android settings. For more detailed instructions and troubleshooting steps, see <a href="https://developers.google.com/chrome-developer-tools/docs/remote-debugging#enable-usb-debugging">Remote Debugging on Android</a>.

### Reverse port forwarding (experimental)

Commonly you have a web server running on your local development machine, and you want to connect to that site from your device. If the development machine and the device are on the same network, this is straightforward. But in some cases, like on restricted corporate networks, this may not be possible without some clever DNS tricks. A new feature in Chrome for Android called __reverse port forwarding__ makes this simple to do. It works by creating a listening TCP port on your device that forwards traffic over USB to a particular TCP port on your development machine. 

To use this feature you will need:


- Chrome 28 or later installed on your development machine
- Chrome for Android Beta installed on your device
- [Android Debug Bridge](http://developer.android.com/tools/help/adb.html) (ADB Chrome extension or full Android SDK) installed on your development machine</li>

To use reverse port forwarding, you need to have your device connected for remote debugging, 
as described in Using the ADB extension. Then you need to enable 
reverse port forwarding and add a port forwarding rule for your application.


First, enable reverse port forwarding:


1. Open Chrome on your development machine.
1. In **about:flags**, turn on **Enable Developer Tools experiments** and restart Chrome.
1. Open **about:inspect**. You should see your mobile device and a list of its open tabs. 
1. Click the "inspect" link next to any of the sites listed.
1. In the DevTools window that opens, open the Settings panel.
1. Under Experiments, turn on **Enable reverse port forwarding**.
1. Close the DevTools window and return to **about:inspect**.



Then add a port forwarding rule:

1. Click the "inspect" link again to open DevTools, and open DevTools Settings again.
1. Click the **Port Forwarding** tab.
1. In the **Device port** field, enter the port number Chrome should connect to on your Android device (defaults to 8080).
1. In the **Target** field, append the port number where your web application is running on your development machine.<figure>{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/AH3npqpx5K2AFyKyxZVt.png", alt="Port forwarding tab in DevTools Settings", width="560", height="235" %}</figure>
1. In Chrome for Android, open **localhost:<device-port-number>**, where <device-port-number> is the value you entered in the **Device port** field (default is 8080).

You should see the content being served by your development machine.

## Flame chart visualization for JavaScript profiles

The new Flame Chart view provides a visual representation of JavaScript processing over time, similar to those found in the Timeline and Network panels.

<figure>{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/k8EkYvCEdg1jKZoHpEkk.png", alt="Flame chart.", width="618", height="361" %}</figure>

The horizontal axis is time and vertical axis is the call stack. Across the top of the panel an overview that shows the entire recording, and you can "zoom in" on a region of the overview by selecting it with your mouse, as shown below. The details view timescale shrinks accordingly.

<figure>{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/6DVSdrm7hET7PSf6tAA9.png", alt="Flame chart zoomed in.", width="618", height="337" %}</figure>

In the details view a call stack is represented as a stack of function "blocks". A block that sits atop another was called by the lower function block. Hovering over a given block displays its function name and timing data:


- **Name** — The name of the function.
- **Self time** — How long it took to complete the current invocation of the function, including only the statements in the function itself, not including any functions that it called.
- **Total time** — The time it took to complete the current invocation of this function and any functions that it called. 
- **Aggregated self time** — Aggregate time for all invocations of the function across the recording, __not__ including functions called by this function.
- **Aggregated total time** — Aggregate total time for all invocations of the function, including functions called by this function.

<figure>{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/s8geUuF66eR2cLdOECyP.png", alt="Flame chart showing timing data", width="358", height="268" %}</figure>

Clicking a function block opens its containing JavaScript file in the Sources panel, at the line where the function is defined.

<figure>{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/K2MC4pquqV3snMjnQSnP.png", alt="Function definition in Sources panel.", width="376", height="108" %}</figure>

To use the flame chart:

1. In DevTools, click the **Profiles** tab.
1. Choose **Record JavaScript CPU profile** and click **Start**.
1. When you are done collecting data, click **Stop**.
1. In the profile view, select the **Flame Chart** visualization. <figure>{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/2guD1VjPFeQro1sHzTvL.png", alt="Visualization menu in profile view", width="301", height="72" %}</figure>

## Five key performance measurement features

Rounding out this survey of revolutionary advances in DevTools are several new feature for investigating performance issues:

- Continuous painting mode
- Showing Paint rectangles and layer borders
- FPS meter
- Finding forced synchronous layouts (layout thrashing)
- Object allocation tracking

### Continuous painting mode

Continuous painting mode is an option in DevTools Settings 
(**Rendering** > **Enable continuous page repainting**) that helps you identify the rendering cost of individual elements or CSS styles. 


Normally, Chrome only paints to the screen in response to a layout or style change, and only those regions of the screen that need updating. When you enable continuous page repainting, the entire screen is being constantly repainted. A heads-up display shows the time it's taking Chrome to paint the page, as well the range of times, and a graph showing the distribution of recent paint times. The horizontal line across the histogram indicates the 16.6 ms mark.

<figure>{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/EUNwZx0f4ZD37AZX8Voa.png", alt="Paint timing heads-up display.", width="254", height="115" %}</figure>

The benefit to using this is that you can walk the DOM tree in the Elements panel and hide individual elements (press the **H** key to hide the currently selected element), or disable an element's CSS styles. You can see how much time one element or style adds to the page render "weight", if any, by noticing changes to the page paint time. If hiding a single element brings the paint times down significantly, you know to focus on the styling or construction of that element.

To enable continuous paining mode:

1. Open DevTools Settings.
1.On the **General** tab, under **Rendering**, turn on **Enable continuous page repainting**.

{% Aside %}
If you don't see this option in Settings, open **about:flags**, turn on **GPU compositing on all pages**, and restart Chrome.
{% endAside %}

For more information, see [Profiling Long Paint Times with DevTools' Continuous Painting Mode](http://updates.html5rocks.com/2013/02/Profiling-Long-Paint-Times-with-DevTools-Continuous-Painting-Mode). 

### Showing paint rectangles and layer borders

Another option in DevTools is to show what rectangular regions of the display are being painted to. (Settings > Rendering > Show paint rectangles). For example, in the screenshot below a paint rectangle is being drawn over the region where a CSS hover effect was being applied to the purple graphic. This is good, since it's relatively small part of the screen.

<figure>{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/CrjWaUZnWS4HLICiZZyB.png", alt="Web site showing paint rectangle.", width="620", height="349" %}</figure>

You want to avoid design and development practices that cause the entire display to be repainted. For example, in the following screenshot the user is scrolling the page. One paint rectangle surrounds the scroll bar, and another surrounds the entire rest of the page. In this case the culprit is the background image on the body element. The image position is set to fixed in CSS, which requires Chrome to repaint the entire page on each scroll.

<figure>{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/JDbQvPf1DIjAh8ZT8lg3.png", alt="Web site showing full-screen repaint.", width="620", height="436" %}</figure>

### FPS meter

The **FPS meter** displays the page's current frame rate, the minimum and maximum frame rate, a bar graph showing frame rate over time, and a histogram that shows frame rate variability.

<figure>{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/oF3g1IBXBlaSHiWjofkm.png", alt="FPS meter", width="381", height="204" %}</figure>

To show the FPS meter:

1. Open DevTools Settings.
1. Click **General**.
1. Under **Rendering**, turn on **Force accelerated compositing** and **Show FPS meter**.

You can force the FPS meter to always appear by opening **about:flags**, turning on **FPS counter**, and restarting Chrome.

### Finding forced synchronous layouts (layout thrashing)

To maximize rendering performance, Chrome normally batches layout changes requested by your application and schedules a layout pass to asynchronously calculate and render the requested changes. However, if an application asks for the value of a layout-dependent property (such offsetHeight or offsetWidth), Chrome is forced to immediately and synchronously perform a page layout. These so-called __forced synchronous layouts__ can significantly reduce rendering performance, especially when performed repeatedly on large DOM trees. This scenario has also been called "layout thrashing".

A Timeline recording alerts you when it detects a forced synchronous layout with a yellow warning icon next to the corresponding Timeline record. Hovering over one of these records displays stack traces for the code that invalidated the layout, and the code that forced the layout.

<figure>{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/l46n9u5ZxzmfH8ltu3H6.png", alt="Forced synchronous layout pop-up in Timeline view.", width="613", height="243" %}</figure>

This pop-up also shows the number of nodes that needed layout, the size of the re-layout tree, the layout scope, and the layout root.

See [Timeline demo: Diagnosing forced synchronous layouts](https://developers.google.com/chrome-developer-tools/docs/demos/too-much-layout/) for more information.

### Object allocation tracking

Object allocation tracking is a new type of memory profile that shows allocation over time. When you start allocation tracking, DevTools takes heap snapshots continuously over time. The heap allocation profile shows where objects are being created and identifies the retaining path.

<figure>{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/dVCDTvILNxOENdsr01jW.png", alt="Heap allocation profile view.", width="620", height="474" %}</figure>

To track object allocations:

1. In DevTools, click the **Profiles** tab.
1. Choose **Record heap allocations** and click **Start**.
1. When you are done collecting data, click **Stop recording heap profile** (the red circle in the lower left corner of the profiling pane).


## Canvas profiling (experimental)

Finally, here's a completely experimental feature to explore. Canvas profiling lets you record and playback WebGL calls made on a canvas element. You can step through individual WebGL calls or call groups and see the rendered results. You also see the time it took to replay those particular calls. 

To use canvas profiling:

1. Turn on the **Canvas inspection** feature on the **Experiments** tab of DevTools settings. (If you don't see this tab, open **about:flags**, turn on **Enable Developer Tools experiments** and restart Chrome.)
1. Click the **Profiles** tab.
1. Select **Capture canvas frame** and click **Take snapshot**.
1. You can now explore the calls used to create the canvas frame.

<figure>{% Img src="image/T4FyVKpzu4WKF1kBNvXepbi08t52/zQahqgrkCBN3yp9RcwfS.png", alt="Canvas profile.", width="620", height="406" %}</figure>
