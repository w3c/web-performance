## Editing Process

Everyone should use the standard fork, branch, and pull request workflow to propose changes to the specification. Please make branch names informative - by including the issue or bug number for example.

Editorial changes that improve the readability of the specification or correct spelling or grammatical mistakes are welcome.

All pull requests must have been reviewed by one or more participants of the working groups. Once the pull request gets enough support, it can be merged.

### Test driven

ALL normative spec changes are generally expected to have a corresponding pull request in [web-platforms-tests][WPT], either in the form of new tests or modifications to existing tests, or must include the rationale for why test updates are not required for the proposed update.

Typically, both pull requests (spec updates and tests) will be merged at the same time. If a pull
request for the specification is approved but the other needs more work, add the '[needs tests](https://w3c.github.io/spec-labels.html)'
label or, in web-platform-tests, the '[status:needs-spec-decision](https://github.com/w3c/web-platform-tests/issues?utf8=%E2%9C%93&q=label%3Astatus%3Aneeds-spec-decision%20)' label. Note that a test change that
contradicts the specification should not be merged before the corresponding specification change.

If testing is not practical due to [web-platforms-tests][WPT] limitations, please explain why and if appropriate [file an issue](https://github.com/w3c/web-platform-tests/issues/new) with the '[type:untestable](https://github.com/w3c/web-platform-tests/issues?utf8=%E2%9C%93&q=label%3Atype%3Auntestable%20)' label to follow up later.

See also the [web-platform-tests documentation][WPT-intro].

## Patent Policy and Licensing

Contributions to the Web Performance repositories are intended to become part of Recommendation-track
documents governed by the
[W3C Patent Policy](http://www.w3.org/Consortium/Patent-Policy-20040205/) and
[Software and Document License](http://www.w3.org/Consortium/Legal/copyright-software). To make substantive contributions to specifications, you must either participate
in the relevant W3C Working Group or make a non-member patent [licensing commitment][licensing].

### Contributors

If you are not the sole contributor to a contribution (pull request), please identify all
contributors in the pull request comment.

To add a contributor (other than yourself, that's automatic), mark them one per line as follows:

```
+@github_username
```

If you added a contributor by mistake, you can remove them in a comment with:

```
-@github_username
```

If you are making a pull request on behalf of someone else but you had no part in designing the
feature, you can remove yourself with the above syntax.

[licensing]: [https://www.w3.org/2004/01/pp-impl/45211/status#licensing-commitments]
[WPT]: https://github.com/w3c/web-platform-tests/
[WPT-intro]: http://web-platform-tests.org/introduction.html
