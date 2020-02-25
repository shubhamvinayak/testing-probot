{
    "injector": {
        "settings": {
            "targetUrl": "http://localhost:8081/mil/",
            "prefix": ""
        },
        "urls": {
            ".*mp_unified_driver.*": {
                "top": [
                    "http://localhost:9001/api/routes/contentserver/content/staticContent/js/locale/locale.js",
                    "http://localhost:9001/api/routes/contentserver/content/staticContent/css/assembly.css",
                    "http://localhost:9001/api/routes/contentserver/content/staticContent/js/assembly.js"
                ],
                "bottom": [
                    "http://localhost:9001/api/routes/contentserver/content/i18n/diagnostics-responsive-i18n.js",
                    "http://localhost:7070/js/diagnostics-responsive.js",
                    "http://localhost:7070/webpack-dev-server.js"
                ]
            }
        },
        "mockResponses": {
            "mockResponseLocation": "src/__tests__/functional-tests/graybox-tests/mock/reply_mock.json",
            "mockCollectionName": "DiagnosticSpecialCharacters"
        },
        "matchingMode": 1
    },
    "webpack": {
        "targets": {
            "dev": {
                "outputFolder": "./dist",
                "fileName": "js/diagnostics-responsive.js",
                "cssFileName": "css/diagnostics-responsive.css",
                "sourceFolders": [
                    "src/main/less/cerner/mpagedev/component/diagnostics",
                    "src/main/js/cerner/mpagedev/component/diagnostics"
                ],
                "externals": {
                    "MPageUI": "MPageUI",
                    "FusionComponent": "FusionComponent",
                    "MP_Util": "MP_Util",
                    "ScriptRequest": "ScriptRequest",
                    "ResultViewer": "ResultViewer",
                    "RTMSTimer": "RTMSTimer",
                    "CERN_Platform": "CERN_Platform"
                },
                "includePolyfills": true,
                "entryPoints": [
                    "src/main/js/cerner/mpagedev/component/diagnostics/Diagnostics.js",
                    "src/main/less/cerner/mpagedev/component/diagnostics/Diagnostics.less"
                ],
                "devtool": "inline-source-map",
                "envify": false,
                "includeCSS": true,
                "minify": false
            },
            "default": {
                "outputFolder": "./dist",
                "fileName": "js/diagnostics-responsive.js",
                "cssFileName": "css/diagnostics-responsive.css",
                "sourceFolders": [
                    "src/main/less/cerner/mpagedev/component/diagnostics",
                    "src/main/js/cerner/mpagedev/component/diagnostics"
                ],
                "externals": {
                    "MPageUI": "MPageUI",
                    "FusionComponent": "FusionComponent",
                    "MP_Util": "MP_Util",
                    "ScriptRequest": "ScriptRequest",
                    "ResultViewer": "ResultViewer",
                    "RTMSTimer": "RTMSTimer",
                    "CERN_Platform": "CERN_Platform"
                },
                "includePolyfills": false,
                "entryPoints": [
                    "src/main/js/cerner/mpagedev/component/diagnostics/Diagnostics.js",
                    "src/main/less/cerner/mpagedev/component/diagnostics/Diagnostics.less"
                ],
                "minify": true,
                "envify": true,
                "includeCSS": false
            }
        }
    },
    "unit-testing": {
        "browser": [
            "Chrome",
            "PhantomJS"
        ],
        "singleRun": true,
        "srcPath": "src/main",
        "specPath": "src/__tests__/unit-tests/spec",
        "mockPath": "src/__tests__/unit-tests/mock",
        "usesFusion": true,
        "target": "default",
        "externals": {
            "MPageUI": "MPageUI",
            "FusionComponent": "FusionComponent",
            "MP_Util": "MP_Util",
            "ScriptRequest": "ScriptRequest",
            "ResultViewer": "ResultViewer",
            "RTMSTimer": "RTMSTimer",
            "CERN_Platform": "CERN_Platform"
        },
        "unitTestPath": "src/__tests__",
        "testRunner": "KARMA",
        "spyPath": "src/__tests__/spy"
    },
    "whatsupdoc": {
        "files": "src/**/*.js"
    },
    "linter": {
        "path": "src/"
    },
    "livedev": {
        "cclProgram": "mp_unified_driver",
        "programParams": "^MINE^,18779463.0,20998484.0,40353778.0,441.0,1110.0,^powerchart.exe^,^$STATIC_CONTENT$^,^MKVP^,9",
        "sourceCodeLocation": "",
        "webServiceUrl": "",
        "cssLocation": "",
        "i18nLocation": "src/main/js/i18n/diagnostics-responsive-i18n.js",
        "isWebpackEnabled": true,
        "isWebpackAutoRefreshEnabled": true,
        "isBedrockEnabled": false,
        "bedrockMocksLocation": ""
    },
    "graybox-testing": {
        "testPath": "src/__tests__/functional-tests/graybox-tests/desktop",
        "target": "default"
    }
}
