// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var articlesList;
    var activation = Windows.ApplicationModel.Activation;

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                WinJS.Application.onsettings = function (e) {
                    e.detail.applicationcommands = { "help": { title: "Privacy policy", href: "../privacy.html" } };
                    WinJS.UI.SettingsFlyout.populateSettings(e);
                }
            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
            }

            var articleListElement = document.getElementById("articleList");
            articleListElement.addEventListener("iteminvoked", itemInvoked);
            backButton.addEventListener("click", backButtonClick);

            articlesList = new WinJS.Binding.List();
            var publicMembers = { ItemList: articlesList };
            WinJS.Namespace.define("C9Data", publicMembers);

            args.setPromise(WinJS.UI.processAll().then(downloadC9BlogFeed));

            //WinJS.UI.processAll().then(downloadC9BlogFeed);
        }
    };

    function backButtonClick(e) {
        articleContent.style.display = "none";
        articleList.style.display = "";
        document.getElementById("mainTitle").innerHTML = "Welcome to Tech4Every1!";
        document.getElementById("mainTitle").classList.remove("contentTitle");
        backButton.style.display = "none";

        WinJS.UI.Animation.enterPage(articleList);
    }

    function itemInvoked(e) {
        var currentArticle = articlesList.getAt(e.detail.itemIndex);
        WinJS.Utilities.setInnerHTMLUnsafe(articleContent, currentArticle.content);
        articleList.style.display = "none";
        articleContent.style.display = "";
        backButton.style.display = "";
        document.getElementById("mainTitle").classList.add("contentTitle");
        //$("#mainTitle").addClass("contentTitle");
        document.getElementById("mainTitle").innerHTML = currentArticle.title;
        WinJS.UI.Animation.enterPage(articleContent);
    }



    //

    function downloadC9BlogFeed() {
        WinJS.xhr({ url: "http://www.tech4every1.com/feeds/posts/default?alt=rss" }).then(function (rss) {

            var items = rss.responseXML.querySelectorAll("item");

            for (var n = 0; n < items.length; n++) {
                var article = {};
                article.title = items[n].querySelector("title").textContent;
                var thumbs = items[n].querySelectorAll("thumbnail");
                if (thumbs.length >= 1) {
                    article.thumbnail = thumbs[0].attributes.getNamedItem("url").textContent;
                }
                else
                    article.thumbnail = "../images/thum.png";
                article.content = items[n].querySelector("description").textContent;
                articlesList.push(article);

            }
        });
    }

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. You might use the
        // WinJS.Application.sessionState object, which is automatically
        // saved and restored across suspension. If you need to complete an
        // asynchronous operation before your application is suspended, call
        // args.setPromise().
    };

    app.start();
})();


