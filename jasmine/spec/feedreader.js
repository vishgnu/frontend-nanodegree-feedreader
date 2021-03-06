/* global an */
/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('each feed has url and url is not empty', function () {

            allFeeds.forEach(function (feed) {
                //console.log(feed);
                // check if not null
                expect(feed.url).toBeDefined();
                 
                // check if is a valid http url with regex
                // this will mean it is also not empty but better ;-)
                expect(feed.url).toMatch("http\://[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(/\S*)?");
            }, this);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('each feed has a name and url is not empty', function () {

            allFeeds.forEach(function (feed) {
                // check if not null
                expect(feed.url).toBeDefined();
                 
                // check name not empty and > 3 shorter names are not helpful!
                //console.log(feed.name.length);
                expect(feed.name.length).toBeGreaterThan(3);
            }, this);
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function () {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('element is hidden by default', function () {
            // get body element check for hidde-menu class
            var ishidden = $(document.body).hasClass("menu-hidden");
            expect(ishidden).toBe(true);
        });
          
        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('changes visibility when clicked', function () {
                
            // click 
            $('a.menu-icon-link').click();
              
            //should show
            var ishidden = $('document.body').hasClass("menu-hidden");
            expect(ishidden).toBe(false);

            // click
            $('a.menu-icon-link').click();
             
            // should hide
            var ishidden = $(document.body).hasClass("menu-hidden");
            expect(ishidden).toBe(true);

        });
    });
    
    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function () {

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        var originalTimeout;

        beforeEach(function (done) {
            originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
            loadFeed(0, done);
        });

        it("should have at least 1 .entry in the .feed container", function (done) {
            // Expect that there is something there in the initial load feed 
                
            var entriesCount = $('.feed').children('.entry-link').length;
            expect(entriesCount).toBeGreaterThan(0);
            done();
        });

        afterEach(function () {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        });

    });
    
    /* TODO: Write a new test suite named "New Feed Selection"*/
    describe('New Feed Selection', function () {
        
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        var originalTimeout;
        var initialContent;

        beforeEach(function (done) {

            originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
             
            // get initial content
            initialContent = $('.feed').html();

            loadFeed(1, done);
        });


        it('changing of feed will change content', function (done) {

            newContent = $('.feed').html();
            // compare old and new html
            expect(initialContent).not.toBe(newContent);
            done();
        });

        afterEach(function () {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        });

    });
} ());
