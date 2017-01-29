console.log('Loading ServiceWorker.');

self.addEventListener("install", function(event) {
  console.log('Installing ServiceWorker.');
});

self.addEventListener("activate", function(event) {
  console.log('Activating ServiceWorker.');
});

self.addEventListener("fetch", function(event) {
  console.log('Fetch event triggered.');
  console.log(event.request);
  var request = reroute(event.request);
  event.respondWith(
    fetch(request).then(serverFetch, serverFailure).catch(serverFailure)
  );

  function serverFetch(response) {
    console.log('Fetching from server.');
    console.log(response);
    return response;
  }

  function serverFailure() {
    console.log('Fetching from server failed.');
    return new Response('<h1>Service Unavailable</h1>', {
      status: 503,
      statusText: 'Service Unavailable',
      headers: new Headers({
        'Content-Type': 'text/html'
      })
    });
  }

  function reroute(request) {
    return new Request(request.url.replace('css/style.css', 'css/alt-style.css'));
  }
});
