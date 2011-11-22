/*
Distributed under both the W3C Test Suite License [1] and the W3C
3-clause BSD License [2]. To contribute to a W3C Test Suite, see the
policies and contribution forms [3].

[1] http://www.w3.org/Consortium/Legal/2008/04-testsuite-license
[2] http://www.w3.org/Consortium/Legal/2008/03-bsd-license
[3] http://www.w3.org/2004/10/27-testcases
 */

//
// Helper Functions for NavigationTiming W3C tests
//

var performanceNamespace = window.performance;
var timingAttributes = [
    'connectEnd',
    'connectStart',
    'domComplete',
    'domContentLoadedEventEnd',
    'domContentLoadedEventStart',
    'domInteractive',
    'domLoading',
    'domainLookupEnd',
    'domainLookupStart',
    'fetchStart',
    'loadEventEnd',
    'loadEventStart',
    'navigationStart',
    'redirectEnd',
    'redirectStart',
    'requestStart',
    'responseEnd',
    'responseStart',
    'unloadEventEnd',
    'unloadEventStart'
];

var skip_all_tests = false;
var namespace_check = false;

//
// All test() functions in the WebPerf test suite should use wp_test() instead.
//
// wp_test() validates the window.performance namespace exists prior to running tests and
// immediately shows a single failure if it does not.
//

function wp_test(func, msg)
{
    // only run the namespace check once
    if (!namespace_check)
    {
        namespace_check = true;

        if (performanceNamespace === undefined || performanceNamespace == null)
        {
            skip_all_tests = true;

            // show a single error that window.performance is undefined
            test(function() { assert_true(performanceNamespace !== undefined && performanceNamespace != null, "window.performance is defined and not null"); }, "window.performance is defined and not null.");
        }
    }

    if (!skip_all_tests)
    {
        test(func, msg);
    }
}

function test_namespace(child_name, skip_root)
{
    if (skip_root === undefined) {
        var msg = 'window.performance is defined';
        wp_test(function () { assert_true(performanceNamespace !== undefined, msg); }, msg);
    }

    if (child_name !== undefined) {
        var msg2 = 'window.performance.' + child_name + ' is defined';
        wp_test(function() { assert_true(performanceNamespace[child_name] !== undefined, msg2); }, msg2);
    }
}

function test_attribute_exists(parent_name, attribute_name)
{
    var msg = 'window.performance.' + parent_name + '.' + attribute_name + ' is defined.';
    wp_test(function() { assert_true(performanceNamespace[parent_name][attribute_name] !== undefined, msg); }, msg);
}

function test_enum(parent_name, enum_name, value)
{
    var msg = 'window.performance.' + parent_name + '.' + enum_name + ' is defined.';
    wp_test(function() { assert_true(performanceNamespace[parent_name][enum_name] !== undefined, msg); }, msg);

    msg = 'window.performance.' + parent_name + '.' + enum_name + ' = ' + value;
    wp_test(function() { assert_equals(performanceNamespace[parent_name][enum_name], value, msg); }, msg);
}

function test_timing_order(attribute_name, greater_than_attribute)
{
    // ensure it's not 0 first
    var msg = "window.performance.timing." + attribute_name + " > 0";
    wp_test(function() { assert_true(performanceNamespace.timing[attribute_name] > 0, msg); }, msg);

    // ensure it's in the right order
    msg = "window.performance.timing." + attribute_name + " >= window.performance.timing." + greater_than_attribute;
    wp_test(function() { assert_true(performanceNamespace.timing[attribute_name] >= performanceNamespace.timing[greater_than_attribute], msg); }, msg);
}

function test_timing_greater_than(attribute_name, greater_than)
{
    var msg = "window.performance.timing." + attribute_name + " > " + greater_than;
    test_greater_than(performanceNamespace.timing[attribute_name], greater_than, msg);
}

function test_timing_equals(attribute_name, equals, msg)
{
    var test_msg = msg || "window.performance.timing." + attribute_name + " == " + equals;
    test_equals(performanceNamespace.timing[attribute_name], equals, test_msg);
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
    wp_test(function () { assert_true(value, msg); }, msg);
}

function test_equals(value, equals, msg)
{
    wp_test(function () { assert_equals(value, equals, msg); }, msg);
}

function test_greater_than(value, greater_than, msg)
{
    wp_test(function () { assert_true(value > greater_than, msg); }, msg);
}

function test_not_equals(value, notequals, msg)
{
    wp_test(function() { assert_true(value !== notequals, msg); }, msg);
}
