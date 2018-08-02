/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('ensures that allFeeds variable is defined and not empty', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* if an url property is not defined the function will return undefined
        *so we expect our function call return a defined output.
         */
         function urlTester() {
           let x;
           for(let feed of allFeeds){
             if(feed.url.length>0)
             x="defined";
             else {
               x=undefined;
               break;
             }
           }
           return x;
         }

         it('loops through the allFeeds array and ensures the urls are defined',function() {
          expect(urlTester()).toBeDefined();
        });

        /* when the name array is not defined the fuunction will automatically return
        *undefined. Since an object can not hold an undefined property this
        *simulataneously checks if our name property is empty or not.
         */

         function nameTester(){
           let y;
           for(let feed of allFeeds){
             if(feed.name.length>0)
             y="defined";
               else {
                 y=undefined;
                 break;
               }
           }
           return y;
         }


         it('ensures that the names are not empty',function () {
           expect(nameTester()).toBeDefined();
         });
    });



    /* TODO: Write a new test suite named "The menu" */
    describe('The Menu',function () {


        /* when the DOM loads the function must ensure that the default calss to the body element is
        *mune-hidden else the function returns false.
        */

         function menuTester() {
           let menu;
            menu=document.querySelector('body').classList.contains('menu-hidden');
             return menu;
         };


         it('should ensure that the menu is hidden by default',function () {
         expect(menuTester()).toBe(true);
       });

         /* by simulating the click we can determine whether or not the menu-hidden class toggles or not,
         *to prevent the posibility of the initial values of my firstcLİCK and secondClick variable from being the same
         *i have given them different values from the start hence they can only be equal if they both have the "works"
        *value assigned t them
        */
          let menuIcon=document.querySelector('.menu-icon-link');
          let body=document.querySelector('body');

          it('should ensure that menu pops out when icon is clicked and draws when clicked again',function () {
            menuIcon.click();
            expect(body.classList.contains('menu-hidden')).toBe(false);
            menuIcon.click();
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });

});

describe('Initial Entries',function () {



        /* after the feeds are done loading we test whether or not the feeds have been loaded on the DOM
        *by checking for child nodes,.
         */

       beforeEach(function(done) {
            loadFeed(0,function () {
              done();
            });

          });


        it('should ensure that there is atleast one entry in our feed container',function(done){

          let FeedContainer= document.querySelector(".feed").querySelectorAll('.entry');
          expect(FeedContainer.length).not.toBe(0);
          done();
        });

      });

    /* TODO: Write a new test suite named "New Feed Selection" */
describe("New Feed Selection",function () {


        /* by loading one feed and checking the rendered html and loading another feed and also checking
        *the rendered html we can check whether or not anything has changed or not.
         */

           let initialState,finalState;
           let myFeeds=document.querySelector('.feed');


  beforeEach(function(done){
        loadFeed(1,function(){
        initialState=myFeeds.innerHTML;
          loadFeed(0, function(){
          finalState=myFeeds.innerHTML;
            done();
          });
        });
    });

         it('should ensure that when a new feed is loaded the content changes',function(done){
          expect(initialState===finalState).toBe(false);
          done();

         })

       });
});
