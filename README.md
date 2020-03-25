# Introduction to render optimization in the browser

This repo contains all the code used in this session.

## Prerequisites
* NodeJs

## How to run
* Clone the repo:
```bash
# like the cool kids do it:
hub clone pinikeizman/render-performance-optimization
# or the old fashion way:
git clone https://github.com/pinikeizman/render-performance-optimization.git
```
* Install the dependencies
```bash
npm i 
```
* Run the server
```bash
npm start
```
* Using your favorite browser and go to [localhost:3000](http://localhost:3000/)
* Click on your preferred example

## Examples

### [Image Processing Example](http://localhost:3000/img_process.html)
A small app that loads an image from the user file system, then using our very sophisticated algorithm (not...) 
enhancing the redness of the image by 25%.
In this example we'll do all the hard work in the UI thread, which is bad and causes the app to lose frames.

### [Image Processing Example Using A WebWorker](http://localhost:3000/img_process_worker.html)
A small app that loads an image from the user file system, then using our very sophisticated algorithm (not...) 
enhancing the redness of the image by 25%.
In this example we'll do all the hard work in the Worker thread, this will free the UI thread to render more frames keeping a high frame rate.

### [Rick and Morty - Layout Thrashing](http://localhost:3000/rick_and_morty.html)
A small app which draws as many rick's and morty's as the user selects, then move them on the screen back and forth using
the well known css attribute `translateX`.
There are 2 moving methods. One which force the browser to calculate Layout thus causing layout thrashing.
The second method aggregates DOM reads and writes and remove the need to recalculating Layout thus prevents layout thrashing. 

