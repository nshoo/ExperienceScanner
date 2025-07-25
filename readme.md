# Experience Scanner

One of the many fun things about the job search is pouring over pages of descriptions, each one with its own special formatting. Sometimes a job sounds particularly interesting, and you even start to get excited, only to find out in the last line that you're about ten years short of experience. Well no longer!

In this repository you'll find a simple chrome extension does away with this particular headache. Before you even start reading, just click a single button, and an LLM will scan through the listing to figure out how many years the company is asking for, and how flexible they seem. Once you have the go ahead that your experience lines up, you can continue reading with confidence.

![An example of the tool in action, showing an indication that the job description lists a minimum number of years of experience, which is given as at least five](minimum.png)

## <a name="usage"></a> Usage

> **Note:** At this time, you must have an OpenAI account and API key in order to use this tool. Support for other models may come in future versions.

After installing the extension, it's very easy to use. I recommend pinning it to the top bar in chrome. Then, you simply navigate to a job description on LinkedIn and activate the extension by clicking its icon (the magnifying glass). If you're in the right place, a popup should appear that says "loading". After a couple of seconds you should see the result of the scan.

There are three classifications for job listings: None, Some, Minimum. This means either a given job requires no prior work experience, some experience, or lists a specific minimum number of years that an applicant must have worked. In this last case, the number of years will also be visible in the output.

## Installation

There are no plans at this time to distribute this extension through the Chrome store, so the installation is, regrettably, a bit cumbersome. You must first open chrome, and navigate to the `chrome://extensions/` page (or open it through the menu). From there you should see a toggle that allows you to enable developer mode, and should do so if not already enabled. This will allow you to load an "unpacked extension", meaning a normal folder with all the code for the extension.

Download the files in this repository, then load the sub-folder "ExperienceScanner" using the "Load unpacked" button in extension manager window. At this point, all that remains to do is to add your API key.

This can be done by right clicking the extension if it's pinned to the top bar. Otherwise, open the extension dropdown from the top bar, and open the dropdown next to the extension name. In either case, you should see an item labeled "option". Clicking this opens the option pane where you can enter your api key. Make sure to press the save button after you've filled in the textbox. After that, everything should be ready!

[Back to usage](#usage)