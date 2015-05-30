<div class="tldr"><span class="outer">[</span>TLDR;<span class="outer">]</div>
####### A great library that extends the architectural constructs of backbone is marionette.js.  #######
<br />

I have been using the [backbone.js](https://github.com/jashkenas/backbone) javascript library for the past few years now. I really enjoy using it for a variety of reasons; its unopinionated, it is not large,

Backbone is very minimal, and provides a very small set of components which have have limited (but essential and easily extended) functionality. Understanding the backbone library is not a difficult task, its source code is not very large and is heavily [annotated](http://backbonejs.org/docs/backbone.html) throughout. You can read through the entire source  in a [relatively short amount of time](https://www.youtube.com/watch?v=k4mBqcRrJ_o&index=1&list=PLlgxAbM67lYIGw8DnANC7VgREbzJRQged). 

On [Backbonejs.org](http://backbonejs.org/) you can see that part of the philosophy of the backbone.js library is "... to be a tool that gives you the freedom to design the full experience of your web application". This is where the learning curve for working with backbone comes in. If you are used to working with highly opinionated frameworks, much like I was prior, you might be under the assumption that the majority of decisions have been made for you and unsure where to start. This is not the case for Backbone, it is not a framework but a library for helping you build your own app architecture. "learning backbone.js" is synonymous to learning different design patterns to use with the components backbone.js provides.
  
An excellent resource for learning these is Addy Osmani's [prolific backbone.js book](http://addyosmani.github.io/backbone-fundamentals/).

Backbone Marionette extends the backbone library to provide you with [a collection of common design and implementation patterns found in applications](https://github.com/marionettejs/backbone.marionette#about-marionette). Marionette adds a lot of tools for helping you build/organize your application.

It has very good documentation in a human readable format at [http://marionettejs.com/](http://marionettejs.com/docs/). Marionette.js is all win if you ask me.

#### Marionette Views ####
one of the things that attracted me to marionette and where most are likely to see benefit right away is with its view classes. Not handling nested views correctly can lead to memory leaks/ [zombie views](https://lostechies.com/derickbailey/2011/09/15/zombies-run-managing-page-transitions-in-backbone-apps/). While handling this yourself is not hard, it can become tedious and require a lot of writing the same code over and over. If you are displaying a lot of nested views, this can add up and make reading your code more difficult. 
<br />
<br />
Since a lot of the benefit that we get out of backbone marionette involves the complexities of large applications, displaying the value through short snippets of code is not as easy with some of the more architectural pieces marionette gives you. However it is not difficult to demonstrate this with Marionettes Views.
<br />
<br />
Below is a example of rendering a collection using backbone

<p data-height="380" data-theme-id="0" data-slug-hash="waGNZd" data-default-tab="result" data-user="dswaby" class='codepen'>See the Pen <a href='http://codepen.io/dswaby/pen/waGNZd/'>backbone collection view</a> by Danny Swaby (<a href='http://codepen.io/dswaby'>@dswaby</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

While nothing in this implementation is overly complicated there is a lot of code I had to write in order to show this collection. 

Here is an overview of what is happening

 * creating a helper function (viewManager) to unbind events/remove html from current view & each of its subviews then render a new view
 * creating a view to wrap our collection and keep track of subviews
 * creating a subview defininition to use for each model
 * create view for each model and append to collection wrapper view html
 
Marionette provides a solution for this through its Views and Regions. Regions are mapped to a jQuery selector and take care of the rendering and cleanup of its view classes. Marionette gives you

 * Item Views for displaying a single item/model
 * Collection Views (for displaying a collection of item views)
 * Composite Views (for displaying collection views with a template wrapped around it)
 * Layout Views (for its managing region)

Below is an example of rendering the same collection using marionettes CollectionView
<p data-height="380" data-theme-id="0" data-slug-hash="rVemap" data-default-tab="result" data-user="dswaby" class='codepen'>See the Pen <a href='http://codepen.io/dswaby/pen/rVemap/'>marionette collectionview</a> by Danny Swaby (<a href='http://codepen.io/dswaby'>@dswaby</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>
 * create a region for displaying collection view
 * creating a view definition for models
 * creating a collection view and childView 
 * use regions show method for inserting view

#### Events ####

Marionette follows Backbones footsteps in that it makes heavy use of its events. Anytime something interesting is happening in your application, Marionette is talking about it. That is to say; Marionette's components will raise events throughout the course of their lifetime. For example, a Marionette.ItemView() will trigger events before the view is rendered, after the view has rendered, before the view is destroyed and after the view is destroyed. 

#### Backbone.Wreqr ####

Backbone wreqr is a messaging system based off [messaging patterns](http://www.eaipatterns.com/) (ie request/response, publish/subscribe, and events). If you have used postal.js, you could consider Wreqr a slimmed down, simplified version of that. 

  
  

  
  



