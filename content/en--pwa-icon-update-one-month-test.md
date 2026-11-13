If you change a PWA's icon after someone has already added it to their home screen, will the installed icon update on its own?

I wanted to answer that question while working on OJapp. I kept the app's `id` unchanged and replaced the icon image, switching from the OJapp icon to the OJapp PRO icon. The two designs were different enough to make the result obvious.

Then I left the installed apps alone for **one month without opening them**. After that, I launched them repeatedly to see whether opening the app would trigger an icon refresh.

**On both iPhone and Android, the old home screen icon stayed in place. Waiting a month did not change it. Opening the app repeatedly did not change it either. Removing the home screen entry and adding it again finally displayed the new icon.**

The PC behaved differently: opening the installed app showed an update notification, and I could apply the update. That difference is the most interesting part of this test.

## What exactly changed in this experiment?

The experiment was deliberately narrow. I wanted to change the icon image **without changing the identity of the installed web app**.

A Web App Manifest can describe an app's name, icon candidates, and launch URL. The `icons` member points to images that the browser or operating system may use for the installed app. The `id` member identifies the web app.

Changing `id` would introduce a separate question about app identity, so I left it as it was. Only the icon changed, from OJapp to OJapp PRO.

I wanted to learn three things:

- Would the existing phone icon update if I simply waited?
- If not, would opening the installed app trigger an update?
- Would the result differ between phones and PCs?

Reinstalling or re-adding an app is an obvious way to pick up new installation metadata. The real question was what happens to the icon **already sitting on the home screen**.

## One month without opening the app

First, I added the OJapp page to the home screens of an iPhone and an Android device. Then I changed the icon image on the site to the OJapp PRO design.

I deliberately avoided opening the installed apps after that change. If launching an app caused its metadata to refresh, opening it too early would have made it harder to observe what happened while it was left alone.

The icons were still visible on the home screens, so checking whether their appearance had changed did not require launching anything.

After one month, neither icon had changed.

**Both devices still showed the original OJapp icon.** The new image was available on the site, but the home screen entries did not reflect it during the waiting period.

Spending an entire month confirming that nothing happened may not sound exciting. But this is exactly the kind of behavior that is difficult to understand from a manifest example alone. Sometimes a useful test is simply a long wait and a very stubborn icon.

## Opening the apps repeatedly made no difference

Next, I launched the PWAs from their home screen icons.

If launching the app triggered an icon refresh, this was the moment when the OJapp PRO icon might appear. It did not.

I opened the apps again, and again. **On both iPhone and Android, the existing home screen icons remained unchanged even after repeated launches.**

This exposed an important distinction: loading the latest web page and updating the icon stored for an installed home screen entry are not the same operation.

A web page can display its current content while the operating system continues to show the image it associated with the app earlier. In this experiment, changing the site's icon metadata was not enough to replace that existing visual entry.

<div class='balloon balloon-boder'>
<figure class='balloon__img balloon__img-left'>
<div><img src='/images/appin2.webp' alt=''></div>
<figcaption class='balloon__name'>Appin</figcaption>
</figure>
<div class='balloon__text balloon__text-right'>👻 The page can be up to date while the home screen icon still looks like the old version!</div>
</div>

## Removing and re-adding finally showed the new icon

For the last phone test, I removed the old home screen entry and added the same page again.

This time, the OJapp PRO icon appeared.

That matters because it shows the replacement image was usable. **A newly added entry picked up the new icon, while an existing entry kept showing the old one.**

Think about a site changing its brand logo or using a special seasonal icon. Updating the image on the website does not necessarily mean existing users will see that new artwork on their phones. In my test, they would have needed to remove the old entry and add the page again.

That is a meaningful limitation for anyone treating the home screen icon as part of their product's visual identity. The icon is what users recognize and tap, but it may remain different from the latest image configured on the site.

## On PC, an update notification appeared

The PC result was different.

**When I opened the installed PWA on PC, an update notification appeared and I could update the app.** I did not need to remove and re-add it as I did on the phones.

Here is the comparison from this experiment:

| Observation | iPhone | Android | PC |
| --- | --- | --- | --- |
| After changing the icon | Old icon remained | Old icon remained | Update notification appeared |
| After one month without launching | Still unchanged | Still unchanged | Not part of the month-long idle test |
| After opening the installed app | Still unchanged after repeated launches | Still unchanged after repeated launches | Update could be applied |
| After removing and re-adding | New icon appeared | New icon appeared | Re-adding was unnecessary |

This is an observation from the environments used in the experiment, not a claim that every desktop browser presents the same interface. What matters here is the contrast I actually saw: the phones kept their old icons, while the PC offered an update path.

The word “PWA” covers experiences that look similar from a user's perspective, but the installed app lifecycle is not identical across platforms. The difference became visible with something as simple as an icon image.

## What this changes for PWA design

The result changed how I think about icon updates in OJapp.

**For phone home screen entries, I would not design a feature around the assumption that replacing the icon on the site will update icons people have already installed.**

An icon is more than decoration. It is the entry point users recognize every day. If an app's branding depends on frequent icon changes, it is worth remembering that the user's installed icon may continue to show an older image.

This experiment was specifically about **the icon shown on the home screen**. It did not test whether every other part of the PWA updates in the same way. Page content and installed icon artwork are separate things to observe.

Keeping `id` unchanged was also essential to the question. The app identity stayed the same, but changing the icon image still did not refresh the existing phone icons. Editing manifest metadata and updating an already-installed icon are two different steps in practice.

## Conclusion: re-add on phones, update prompt on PC

The outcome of the OJapp-to-OJapp-PRO icon experiment was straightforward.

**On iPhone and Android, the installed icons did not change after a month of inactivity, and repeated launches did not update them. Removing and re-adding the home screen entries displayed the new icon.**

**On PC, opening the installed PWA displayed an update notification, and I was able to update it.**

The experiment is a useful reminder to think beyond the moment of installation. It is easy to test how a PWA looks when it is first added. The harder question is what happens after the site changes and the app is already on someone's device.

After a full month of waiting, my phone icons had one clear message: they were in no hurry to change.
