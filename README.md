# troupeit_player_rn

React-Native iOS application that allows users to authenticate,
synchronize their shows, and make music available offline.

Makes extensive use of altjs for storage and updates

Routing is provided by Erouter

===
How will we handle downloads?

When the user clicks download (show / event), We have to enqueue the download.

So I guess what we have is an array of shit that needs to get downloaded.

handleDownload -> downloading (which I assume is going to be a promise) -> done

We fire two events. A progress event, and a downloaded event.

the progress event, I assume updates this.state on the page.

So maybe once we know the assets, we can then post status about them (this.state.assetstatus[....].foo)

We will have to have a download-status database of some kind to track what we  have done (maybe on-disk file is enough or sqlite?)

=== next steps ===

Where are the asset URLs located? How come my API doesn't supply them?

/show/xxxxx/passets.json (https://troupeit.com/shows/56e8aa5b60393a3177000020/passets.json) -- yes

or

/show/xxxxx/analyze_passets.json

Show doesn't supply it. 
events does but in a dfferent way
