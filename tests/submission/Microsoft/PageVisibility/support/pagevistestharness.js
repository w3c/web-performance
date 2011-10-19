//=====================================================//
// Variables used for testing.
var open_link;
var notification_step = null;
var main_doc = null;
var child_doc_shown = null;
var child_doc_hidden = null;
var transition_mode;
var manual_test = null;

var expected_notification_count = 2;
var expected_frame_notification_count = 4;
var notification_count = 0;
var frame_notification_count = 0;
var two_notifications = false;

var rollup_stage = 0;

// object containing references to all asynchronous tests
var async_tests = new Array();

// transition mode constants
var TRANSITION_MODE_TAB_SWITCH = 0;
var TRANSITION_MODE_MIN_MAX    = 1;

var T02_HIDDEN_ON_TRANSITION_PAGE           = 2;
var T03_HIDDEN_STATE_ON_TRANSITION_PAGE     = 3;
var T04_HIDDEN_ON_TRANSITION_IFRAME         = 4;
var T05_HIDDEN_STATE_ON_TRANSITION_IFRAME   = 5;
var T06_VISIBLE_ON_RETURN_PAGE              = 6;
var T07_VISIBLE_STATE_ON_RETURN_PAGE        = 7;
var T08_VISIBLE_ON_RETURN_IFRAME            = 8;
var T09_VISIBLE_STATE_ON_RETURN_IFRAME      = 9;
var T10_TWO_REGISTRATIONS_DIFF_CB           = 10;
var T11_TWO_REGISTRATIONS_SAME_CB           = 11;
var T12_EXP_PAGE_COUNT                      = 12;
var T13_EXP_IFRAME_COUNT                    = 13;

// get prefix used in feature names, if there is one
var prefix = GetVendorPrefix(document, "hidden");
prefix = (prefix !== undefined) ? prefix : '';

// Since there are tests for whether or not attributes exist for the different visibility states,
// any tests that involve checking the visibility state will check against the known values
// of these attributes instead of the attributes themselves, since we do not want to fail these
// tests (which are unrelated to the implementation of the attributes) if the UA does not implement
// the attributes
var PAGE_HIDDEN_VAL = "hidden";
var PAGE_VISIBLE_VAL = "visible";

// There are various optional attributes that may or may not exist, but must be defined and named
// according to the conventions laid out on http://www.w3.org/TR/page-visibility/#sec-vendor-prefix
// Some of the known potentional optional attributes are checked in this test.
var optional_att = [
    "preview",
    "prerender"
];

//=====================================================//
//Change this to be functions that you will test.
//You can alternatively place this within your individual test files.

function test_api_exists(doc, doc_name)
{
    test_defined(BrowserHasFeature(doc, "hidden"), ((doc_name !== undefined) ? doc_name + '.' : '') + AppendPrefix(prefix, "hidden") + " is defined.");
    test_defined(BrowserHasFeature(doc, "visibilityState"), ((doc_name !== undefined) ? doc_name + '.' : '') + AppendPrefix(prefix, "visibilityState") + " is defined.");
}

function test_api_exists_enum(doc, doc_name)
{
    //Test enum values of the visibility states
    test_equals(BrowserHasFeature(doc, "PAGE_HIDDEN", true), "hidden", ((doc_name !== undefined) ? doc_name + '.' : '') + AppendPrefix(prefix, "PAGE_HIDDEN", true) + " is 'hidden'");
    test_equals(BrowserHasFeature(doc, "PAGE_VISIBLE", true), "visible", ((doc_name !== undefined) ? doc_name + '.' : '') + AppendPrefix(prefix, "PAGE_VISIBLE", true) + " is 'visible'");
}

function test_api_exists_optional(doc, doc_name)
{
    // loop through all known optional attributes
    for (i = 0; i < optional_att.length; i++)
    {
        // check if this paramter exists
        if (BrowserHasFeature(doc, "PAGE_" + optional_att[i].toUpperCase(), true) !== undefined)
        {
            // if it does exist, make sure it is defined correctly
            test_equals(BrowserHasFeature(doc, "PAGE_" + optional_att[i].toUpperCase(), true), optional_att[i], 
                ((doc_name !== undefined) ? doc_name + '.' : '') + AppendPrefix(prefix, "PAGE_" + optional_att[i].toUpperCase(), true) + " is '" + optional_att[i] + "'");
        }
    }
}

function test_read_only_conformance(doc, doc_name)
{
    // test read only conformance
    test_read_only(doc, AppendPrefix(prefix, "hidden"), ((doc_name !== undefined) ? doc_name + '.' : '') + AppendPrefix(prefix, "hidden") + " cannot be overwritten");
    test_read_only(doc, AppendPrefix(prefix, "visibilityState"), ((doc_name !== undefined) ? doc_name + '.' : '') + AppendPrefix(prefix, "visibilityState") + " cannot be overwritten");
}

function test_read_only_conformance_enum(doc, doc_name)
{
    // test read only conformance
    test_read_only(doc, AppendPrefix(prefix, "PAGE_HIDDEN", true), ((doc_name !== undefined) ? doc_name + '.' : '') + AppendPrefix(prefix, "PAGE_HIDDEN", true) + " cannot be overwritten");
    test_read_only(doc, AppendPrefix(prefix, "PAGE_VISIBLE", true), ((doc_name !== undefined) ? doc_name + '.' : '') + AppendPrefix(prefix, "PAGE_VISIBLE", true) + " cannot be overwritten");
}

function test_api_match(parent_doc, child_doc, parent_doc_name, child_doc_name)
{
    // test child document's api state matches parent document's api state
    test_equals(BrowserHasFeature(child_doc, "hidden"), BrowserHasFeature(parent_doc, "hidden"), 
        ((parent_doc_name !== undefined) ? parent_doc_name + '.' : '') + AppendPrefix(prefix, "hidden") + " = " + 
        ((child_doc_name !== undefined) ? child_doc_name + '.' : '') + AppendPrefix(prefix, "hidden") + ".");
    test_equals(BrowserHasFeature(child_doc, "visibilityState"), BrowserHasFeature(parent_doc, "visibilityState"), 
        ((parent_doc_name !== undefined) ? parent_doc_name + '.' : '') + AppendPrefix(prefix, "visibilityState")  + " = " + 
        ((child_doc_name !== undefined) ? child_doc_name + '.' : '') + AppendPrefix(prefix, "visibilityState") + ".");
}

function test_transition_init(doc, t_mode, doc_name)
{
    if (t_mode == null)
    {
        t_mode = TRANSITION_MODE_TAB_SWITCH;
    }
    transition_mode = t_mode;
    
    main_doc = doc;
    child_doc_shown = main_doc.getElementById("childDocShown").contentDocument;
    child_doc_hidden = main_doc.getElementById("childDocHidden").contentDocument;
    
    if (prefix !== undefined)
    {
        var verifyToken1 = main_doc.addEventListener(prefix + "visibilitychange", VerifyNotification);
        var verifyToken2 = main_doc.addEventListener(prefix + "visibilitychange", VerifyNotification);
        var verifyToken3 = main_doc.addEventListener(prefix + "visibilitychange", VerifyTwoNotifications);
        var verifyToken4 = child_doc_shown.addEventListener(prefix + "visibilitychange", VerifyFrameNotification);
        var verifyToken5 = child_doc_hidden.addEventListener(prefix + "visibilitychange", VerifyFrameNotification);
    }
    else
    {
        var verifyToken1 = main_doc.addEventListener("visibilitychange", VerifyNotification);
        var verifyToken2 = main_doc.addEventListener("visibilitychange", VerifyNotification);
        var verifyToken3 = main_doc.addEventListener("visibilitychange", VerifyTwoNotifications);
        var verifyToken4 = child_doc_shown.addEventListener("visibilitychange", VerifyFrameNotification);
        var verifyToken5 = child_doc_hidden.addEventListener("visibilitychange", VerifyFrameNotification);
    }
    notification_step = 1;
    
    // add tests
    if (transition_mode == TRANSITION_MODE_TAB_SWITCH)
    {
        async_tests[T02_HIDDEN_ON_TRANSITION_PAGE] = async_test(AppendPrefix(prefix, "hidden") + " = true (page is hidden on tab switch).", {timeout:60*1000});
    }
    else
    {
        async_tests[T02_HIDDEN_ON_TRANSITION_PAGE] = async_test(AppendPrefix(prefix, "hidden") + " = true (page is hidden on minimization).", {timeout:60*1000});
    }
    async_tests[T03_HIDDEN_STATE_ON_TRANSITION_PAGE] = async_test(AppendPrefix(prefix, "visibilityState") + " = '" + PAGE_HIDDEN_VAL + "'", {timeout:60*1000});
    async_tests[T04_HIDDEN_ON_TRANSITION_IFRAME] = async_test(AppendPrefix(prefix, "hidden") + " = true (within all IFrame documents)", {timeout:60*1000});
    async_tests[T05_HIDDEN_STATE_ON_TRANSITION_IFRAME] = async_test(AppendPrefix(prefix, "visibilityState") + " = '" + PAGE_HIDDEN_VAL + "' (within all IFrame documents)", {timeout:60*1000});
    if (transition_mode == TRANSITION_MODE_TAB_SWITCH)
    {
        async_tests[T06_VISIBLE_ON_RETURN_PAGE] = async_test(AppendPrefix(prefix, "hidden") + " = false (page is visible on return to tab).", {timeout:60*1000});
    }
    else
    {
        async_tests[T06_VISIBLE_ON_RETURN_PAGE] = async_test(AppendPrefix(prefix, "hidden") + " = false (page is visible on restoration).", {timeout:60*1000});
    }
    async_tests[T07_VISIBLE_STATE_ON_RETURN_PAGE] = async_test(AppendPrefix(prefix, "visibilityState") + " = '" + PAGE_VISIBLE_VAL + "'", {timeout:60*1000});
    async_tests[T08_VISIBLE_ON_RETURN_IFRAME] = async_test(AppendPrefix(prefix, "hidden") + " = false (within all IFrame documents).", {timeout:60*1000});
    async_tests[T09_VISIBLE_STATE_ON_RETURN_IFRAME] = async_test(AppendPrefix(prefix, "visibilityState") + " = '" + PAGE_VISIBLE_VAL + "' (within all IFrame documents)", {timeout:60*1000});
    async_tests[T10_TWO_REGISTRATIONS_DIFF_CB] = async_test("Two registrations (different callbacks) occurred.", {timeout:60*1000});
    async_tests[T11_TWO_REGISTRATIONS_SAME_CB] = async_test("Two registrations (same callback) did not occur.", {timeout:60*1000});
    async_tests[T12_EXP_PAGE_COUNT] = async_test("Number of page's visibilitychange events is expected", {timeout:60*1000});
    async_tests[T13_EXP_IFRAME_COUNT] = async_test("Number of IFrames' visibilitychange events is expected", {timeout:60*1000});
    
    if (transition_mode == TRANSITION_MODE_TAB_SWITCH)
    {
        try
        {
            if (window.external)
            {
                open_link = window.open('', '_blank');
                //Perform the close in a setTimeout to allow this block of code to exit before
                //doing the closure.  This will also serve the purpose of allowing the user to
                //see the tab actually getting opened for verification.
                setTimeout(function() { open_link.close(); }, 1000);
            }
            else
            {
                setTimeout(VerifyTest, 0);
            }
        }
        catch(ex)
        {
            setTimeout(VerifyTest, 0);
        }
    }
}

function VerifyFrameNotification()
{
    frame_notification_count++;
    if (frame_notification_count > expected_frame_notification_count)
    {
        //test_true(false, "An event fired inside a frame after its listener was removed.");
        add_async_result(async_tests[T13_EXP_IFRAME_COUNT], false);
    }
}

function VerifyNotification()
{
    notification_count++;
    if (notification_count > expected_notification_count)
    {
        //test_true(false, "An event fired inside the document after its listener was removed.");
        add_async_result(async_tests[T12_EXP_PAGE_COUNT], false);
    }
    
    if (notification_step)
    {
        switch (notification_step)
        {
            case 1:
                // First step, check page visibility after tab deselection / minimization.  
                // hidden should change to false; visibilityState should change to PAGE_HIDDEN
                add_async_result(async_tests[T02_HIDDEN_ON_TRANSITION_PAGE], BrowserHasFeature(main_doc, "hidden"));
                add_async_result(async_tests[T03_HIDDEN_STATE_ON_TRANSITION_PAGE], BrowserHasFeature(main_doc, "visibilityState") == PAGE_HIDDEN_VAL);
                          
                // Check to make sure child IFrame documents did have the visibility change event bubble
                // down to them. The child documents' visibility state should match their parent's.
                add_async_result(async_tests[T04_HIDDEN_ON_TRANSITION_IFRAME], 
                    (BrowserHasFeature(child_doc_shown, "hidden")) && (BrowserHasFeature(child_doc_hidden, "hidden")));
                add_async_result(async_tests[T05_HIDDEN_STATE_ON_TRANSITION_IFRAME], 
                    BrowserHasFeature(child_doc_shown, "visibilityState") == PAGE_HIDDEN_VAL && 
                    BrowserHasFeature(child_doc_hidden, "visibilityState") == PAGE_HIDDEN_VAL);
                    
                /*test_true((BrowserHasFeature(child_doc_shown, "hidden")) && (BrowserHasFeature(child_doc_hidden, "hidden")), 
                          "The visibilityChange event should bubble: all IFrame child documents should become hidden.");
                test_true(BrowserHasFeature(child_doc_shown, "visibilityState") == PAGE_HIDDEN_VAL && 
                          BrowserHasFeature(child_doc_hidden, "visibilityState") == PAGE_HIDDEN_VAL, 
                          "All IFrame child documents' visibility states should now be visible.");*/
                          
                notification_step = 2;
                break;

            case 2:
                //Second step, check page visibility after tab reselection / maximization / restoration.  
                // hidden should change to false; visibilityState should change to PAGE_VISIBLE
                /*if (transition_mode == TRANSITION_MODE_TAB_SWITCH)
                {
                    test_false(BrowserHasFeature(main_doc, "hidden"), "Page is visible again on return to tab");
                }
                else if (transition_mode == TRANSITION_MODE_MIN_MAX)
                {
                    test_false(BrowserHasFeature(main_doc, "hidden"), "Page is visible again on maximization / restoration");
                }
                test_true(BrowserHasFeature(main_doc, "visibilityState") == PAGE_VISIBLE_VAL, 
                          "Page visibility state should now be visible.");*/
                add_async_result(async_tests[T06_VISIBLE_ON_RETURN_PAGE], !BrowserHasFeature(main_doc, "hidden"));
                add_async_result(async_tests[T07_VISIBLE_STATE_ON_RETURN_PAGE], BrowserHasFeature(main_doc, "visibilityState") == PAGE_VISIBLE_VAL);
                          
                // check to make sure child IFrame documents have turned visible
                /*test_true((!BrowserHasFeature(child_doc_shown, "hidden")) && (!BrowserHasFeature(child_doc_hidden, "hidden")), "All IFrame child documents are now visible.");
                test_true(BrowserHasFeature(child_doc_shown, "visibilityState") == PAGE_VISIBLE_VAL && 
                          BrowserHasFeature(child_doc_hidden, "visibilityState") == PAGE_VISIBLE_VAL, 
                          "All IFrame child documents' visibility states should now be visible.");*/
                add_async_result(async_tests[T08_VISIBLE_ON_RETURN_IFRAME], 
                    (!BrowserHasFeature(child_doc_shown, "hidden")) && (!BrowserHasFeature(child_doc_hidden, "hidden")));
                add_async_result(async_tests[T09_VISIBLE_STATE_ON_RETURN_IFRAME], 
                    BrowserHasFeature(child_doc_shown, "visibilityState") == PAGE_VISIBLE_VAL && 
                    BrowserHasFeature(child_doc_hidden, "visibilityState") == PAGE_VISIBLE_VAL);

                //Verify that a second registration to a different callback also occurred
                //test_true(two_notifications, "Two registrations (different callbacks) occurred.");
                add_async_result(async_tests[T10_TWO_REGISTRATIONS_DIFF_CB], two_notifications);

                //Verify that a second registration to the same callback did not occur
                //test_equals(notification_count,
                //            expected_notification_count,
                //            "Two registrations (same callback) did not occur.");
                add_async_result(async_tests[T11_TWO_REGISTRATIONS_SAME_CB], notification_count == expected_notification_count);
                            
                            
                // get prefix used in feature names, if there is one
                var prefix = GetVendorPrefix(main_doc, "hidden");
                prefix = (prefix !== undefined) ? prefix : '';

                //Remove all event listeners and verify that the event does not fire
                main_doc.removeEventListener(prefix + "visibilitychange", VerifyNotification);
                main_doc.removeEventListener(prefix + "visibilitychange", VerifyTwoNotifications);
                
                // pass the manual item associated with these tests
                //add_async_result(async_tests['manual_test'], true);
                
                notification_step = 3;
                
                // schedule first stage of rollup
                setTimeout(VerifyAllNotifications, 200);
                break;
            case 3:
                //This step should not have occurred since the event handlers were cleared
                //test_true(false, "Event did not fire when event listener is removed.");
                add_async_result(async_tests[T12_EXP_PAGE_COUNT], false);

                //No more tests to run  
                notification_step = null;

                //On final step, schedule the rollup
                setTimeout(VerifyTest, 2000);
                break;

            default:
                break;
        }
    }
}

function VerifyAllNotifications()
{
    rollup_stage++;
    switch(rollup_stage)
    {
        case 1:
            // remove listeners from the child frames
            child_doc_shown.removeEventListener(prefix + "visibilitychange", VerifyFrameNotification);
            child_doc_hidden.removeEventListener(prefix + "visibilitychange", VerifyFrameNotification);
            
            if (transition_mode == TRANSITION_MODE_TAB_SWITCH)
            {
                //open a new tab.  Since the event is no longer registered, no
                //notification should occur.
                open_link = window.open('', '_blank');
                setTimeout(function() { open_link.close(); }, 1000);
            }
        
            // schedule second stage of rollup
            setTimeout(VerifyAllNotifications, 1200);
            break;
        case 2:
            // verify the expected number of visibilitychange events occurred in the child frames
            /*test_equals(frame_notification_count,
                        expected_frame_notification_count,
                        "Number of expected child frames' visibilityChange events: " + expected_frame_notification_count + "; actual events: " + frame_notification_count + ".");*/
            add_async_result(async_tests[T12_EXP_PAGE_COUNT], notification_count == expected_notification_count);
            add_async_result(async_tests[T13_EXP_IFRAME_COUNT], frame_notification_count == expected_frame_notification_count);

            //On final step, schedule the rollup
            setTimeout(VerifyTest, 1000);
            break;
        default: 
            break;
    }
}

function VerifyTwoNotifications()
{
    //This is a duplicate registration on visibilitychange and
    //should never get fired.  Check that duplicate_notification
    //is false to verify that this never occurred.
    two_notifications = true;
}

//
// Non-test related helper functions
//

function sleep_milliseconds(n)
{
    var start = new Date().getTime();
    while (true) {
        if ((new Date().getTime() - start) >= n) break;
    }
}

//
// Common helper functions
//

function test_true(value, msg)
{
    test(function () { assert_true(value, msg); }, msg);
}

function test_false(value, msg)
{
    test(function () { assert_false(value, msg); }, msg);
}

function test_equals(value, equals, msg)
{
    test(function () { assert_equals(value, equals, msg); }, msg);
}

function test_greater_than(value, greater_than, msg)
{
    test(function () { assert_true(value > greater_than, msg); }, msg);
}

function test_not_equals(value, notequals, msg)
{
    test(function() { assert_true(value !== notequals, msg); }, msg);
}

function test_defined(value, msg)
{
    test(function() { assert_true(value !== undefined, msg); }, msg);
}

function test_read_only(parent, child_name, msg)
{
    var prevVal = parent[child_name];
    var attemptVal = prevVal + "new value";
    parent[child_name] = attemptVal;
    test(function() { assert_true(parent[child_name] == prevVal, msg); }, msg);
}

function test_read_write(parent, child_name, msg)
{
    var prevVal = parent[child_name];
    var attemptVal = prevVal + "new value";
    parent[child_name] = attemptVal;
    test(function() { assert_true(parent[child_name] == attemptVal, msg); }, msg);
}

//
// Test Setup and Cleanup
//

function SetupResultTable(properties)
{
    (properties !== undefined) ? setup(properties) : setup({explicit_done: true});
}

function VerifyTest()
{
    done();
}

//
// asynchronous test helper functions
//

function add_async_result(test_obj, pass_state)
{
    // add assertion to manual test for the pass state
    test_obj.step(function() {assert_true(pass_state)});
    
    // end manual test
    test_obj.done();
}