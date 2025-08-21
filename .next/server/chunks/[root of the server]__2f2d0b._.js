module.exports = {

"[externals]/next/dist/compiled/next-server/pages-api.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
const mod = __turbopack_external_require__("next/dist/compiled/next-server/pages-api.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-api.runtime.dev.js"));

module.exports = mod;
}}),
"[project]/util/api/fetchData.ts [api] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
/* eslint-disable @typescript-eslint/no-explicit-any */ __turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
async function __TURBOPACK__default__export__(url, refreshToken, maxRetries = 3, delay = 1000 // initial delay in ms
) {
    const requestOptions = {
        method: "GET",
        headers: {
            Cookie: `oauth-abw_church_account_id=3619012236345409;oauth-abw_refresh_token=${refreshToken}`
        },
        redirect: "follow"
    };
    for(let attempt = 0; attempt <= maxRetries; attempt++){
        try {
            const response = await fetch(url, requestOptions);
            if (!response.ok) {
                throw new Error(`Fetch failed: ${url}, Status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Attempt ${attempt + 1} failed:`, error);
            if (attempt < maxRetries) {
                await new Promise((res)=>setTimeout(res, delay * Math.pow(2, attempt))); // exponential backoff
            } else {
                console.error("All retry attempts failed.");
                return null;
            }
        }
    }
}
}}),
"[project]/util/filterUniqueEvent.ts [api] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
const __TURBOPACK__default__export__ = (events)=>{
    const eventDays = new Set();
    return events.filter(({ itemDate })=>{
        const date = new Date(itemDate - 3 * 60 * 60 * 1000);
        const dayKey = date.toISOString().split("T")[0]; // Gets YYYY-MM-DD in UTC
        if (eventDays.has(dayKey)) return false;
        eventDays.add(dayKey);
        return true;
    });
};
}}),
"[externals]/p-limit [external] (p-limit, esm_import)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, a: __turbopack_async_module__, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
const mod = await __turbopack_external_import__("p-limit");

__turbopack_export_namespace__(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[project]/app/mission/unassigned/api/getReferrals.ts [api] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, a: __turbopack_async_module__, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_esm__({
    "getReferrals": (()=>getReferrals),
    "loadReferralDetails": (()=>loadReferralDetails)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$util$2f$api$2f$fetchData$2e$ts__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/util/api/fetchData.ts [api] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$util$2f$filterUniqueEvent$2e$ts__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/util/filterUniqueEvent.ts [api] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$p$2d$limit__$5b$external$5d$__$28$p$2d$limit$2c$__esm_import$29$__ = __turbopack_import__("[externals]/p-limit [external] (p-limit, esm_import)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$p$2d$limit__$5b$external$5d$__$28$p$2d$limit$2c$__esm_import$29$__
]);
([__TURBOPACK__imported__module__$5b$externals$5d2f$p$2d$limit__$5b$external$5d$__$28$p$2d$limit$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__);
;
;
;
const limit = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$p$2d$limit__$5b$external$5d$__$28$p$2d$limit$2c$__esm_import$29$__["default"])(3);
async function fetchAreaInfo(referrals, refreshToken) {
    return Promise.all(referrals.map(async (ref)=>{
        const url = `https://referralmanager.churchofjesuschrist.org/services/mission/assignment?address=${ref.address}`;
        const areaInfo = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$util$2f$api$2f$fetchData$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["default"])(url, refreshToken);
        return {
            ...ref,
            areaInfo
        };
    }));
}
async function fetchEvents(referrals, refreshToken) {
    return Promise.all(referrals.map(async (ref)=>{
        const contactAttempts = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$util$2f$api$2f$fetchData$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["default"])(`https://referralmanager.churchofjesuschrist.org/services/progress/timeline/${ref.personGuid}`, refreshToken);
        if (contactAttempts) {
            const filteredAttempts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$util$2f$filterUniqueEvent$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["default"])(contactAttempts.filter(({ timelineItemType })=>[
                    "CONTACT",
                    "TEACHING"
                ].includes(timelineItemType)));
            return {
                ...ref,
                contactAttempts: filteredAttempts
            };
        }
        return {
            ...ref,
            contactAttempts: []
        };
    }));
}
async function loadReferralDetails(referrals, refreshToken) {
    const withArea = await fetchAreaInfo(referrals, refreshToken);
    const withEvents = await fetchEvents(withArea, refreshToken);
    return withEvents;
}
async function getReferrals(refreshToken) {
    const missionId = ("TURBOPACK compile-time value", "14319");
    const url = `https://referralmanager.churchofjesuschrist.org/services/people/mission/${missionId}`;
    const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$util$2f$api$2f$fetchData$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["default"])(url, refreshToken);
    if (!data) return [];
    const persons = data.persons;
    const filtered = persons.filter((ref)=>!ref.areaId && ref.personStatusId === 1);
    filtered.sort((a, b)=>new Date(b.createDate).getTime() - new Date(a.createDate).getTime());
    return filtered;
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/pages/api/referrals/complete.ts [api] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, a: __turbopack_async_module__, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
// pages/api/loadReferralDetails.ts
__turbopack_esm__({
    "default": (()=>handler)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$mission$2f$unassigned$2f$api$2f$getReferrals$2e$ts__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/app/mission/unassigned/api/getReferrals.ts [api] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$mission$2f$unassigned$2f$api$2f$getReferrals$2e$ts__$5b$api$5d$__$28$ecmascript$29$__
]);
([__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$mission$2f$unassigned$2f$api$2f$getReferrals$2e$ts__$5b$api$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__);
;
async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method Not Allowed"
        }); // Only POST is supported
    }
    const { refreshToken } = req.query;
    const referrals = JSON.parse(req.body);
    if (!refreshToken || !referrals) {
        return res.status(400).json({
            error: "Missing refreshToken or referrals in request"
        });
    }
    try {
        const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$mission$2f$unassigned$2f$api$2f$getReferrals$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["loadReferralDetails"])(referrals, String(refreshToken));
        return res.status(200).json(data);
    } catch (error) {
        console.error("Error in loadReferralDetails API:", error);
        return res.status(500).json({
            error: "Internal Server Error"
        });
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/node_modules/next/dist/esm/server/route-modules/pages-api/module.compiled.js [api] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
if ("TURBOPACK compile-time falsy", 0) {
    "TURBOPACK unreachable";
} else {
    if ("TURBOPACK compile-time truthy", 1) {
        module.exports = __turbopack_require__("[externals]/next/dist/compiled/next-server/pages-api.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api.runtime.dev.js, cjs)");
    } else {
        "TURBOPACK unreachable";
    }
} //# sourceMappingURL=module.compiled.js.map
}}),
"[project]/node_modules/next/dist/esm/server/route-kind.js [api] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "RouteKind": (()=>RouteKind)
});
var RouteKind = /*#__PURE__*/ function(RouteKind) {
    /**
   * `PAGES` represents all the React pages that are under `pages/`.
   */ RouteKind["PAGES"] = "PAGES";
    /**
   * `PAGES_API` represents all the API routes under `pages/api/`.
   */ RouteKind["PAGES_API"] = "PAGES_API";
    /**
   * `APP_PAGE` represents all the React pages that are under `app/` with the
   * filename of `page.{j,t}s{,x}`.
   */ RouteKind["APP_PAGE"] = "APP_PAGE";
    /**
   * `APP_ROUTE` represents all the API routes and metadata routes that are under `app/` with the
   * filename of `route.{j,t}s{,x}`.
   */ RouteKind["APP_ROUTE"] = "APP_ROUTE";
    /**
   * `IMAGE` represents all the images that are generated by `next/image`.
   */ RouteKind["IMAGE"] = "IMAGE";
    return RouteKind;
}({}); //# sourceMappingURL=route-kind.js.map
}}),
"[project]/node_modules/next/dist/esm/build/templates/helpers.js [api] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
/**
 * Hoists a name from a module or promised module.
 *
 * @param module the module to hoist the name from
 * @param name the name to hoist
 * @returns the value on the module (or promised module)
 */ __turbopack_esm__({
    "hoist": (()=>hoist)
});
function hoist(module, name) {
    // If the name is available in the module, return it.
    if (name in module) {
        return module[name];
    }
    // If a property called `then` exists, assume it's a promise and
    // return a promise that resolves to the name.
    if ('then' in module && typeof module.then === 'function') {
        return module.then((mod)=>hoist(mod, name));
    }
    // If we're trying to hoise the default export, and the module is a function,
    // return the module itself.
    if (typeof module === 'function' && name === 'default') {
        return module;
    }
    // Otherwise, return undefined.
    return undefined;
} //# sourceMappingURL=helpers.js.map
}}),
"[project]/node_modules/next/dist/esm/build/templates/pages-api.js { INNER_PAGE => \"[project]/pages/api/referrals/complete.ts [api] (ecmascript)\" } [api] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, a: __turbopack_async_module__, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_esm__({
    "config": (()=>config),
    "default": (()=>__TURBOPACK__default__export__),
    "routeModule": (()=>routeModule)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$modules$2f$pages$2d$api$2f$module$2e$compiled$2e$js__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/server/route-modules/pages-api/module.compiled.js [api] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$kind$2e$js__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/server/route-kind.js [api] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/build/templates/helpers.js [api] (ecmascript)");
// Import the userland code.
var __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$referrals$2f$complete$2e$ts__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/pages/api/referrals/complete.ts [api] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$referrals$2f$complete$2e$ts__$5b$api$5d$__$28$ecmascript$29$__
]);
([__TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$referrals$2f$complete$2e$ts__$5b$api$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__);
;
;
;
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$api$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$referrals$2f$complete$2e$ts__$5b$api$5d$__$28$ecmascript$29$__, 'default');
const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$api$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$referrals$2f$complete$2e$ts__$5b$api$5d$__$28$ecmascript$29$__, 'config');
const routeModule = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$modules$2f$pages$2d$api$2f$module$2e$compiled$2e$js__$5b$api$5d$__$28$ecmascript$29$__["PagesAPIRouteModule"]({
    definition: {
        kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$kind$2e$js__$5b$api$5d$__$28$ecmascript$29$__["RouteKind"].PAGES_API,
        page: "/api/referrals/complete",
        pathname: "/api/referrals/complete",
        // The following aren't used in production.
        bundlePath: '',
        filename: ''
    },
    userland: __TURBOPACK__imported__module__$5b$project$5d2f$pages$2f$api$2f$referrals$2f$complete$2e$ts__$5b$api$5d$__$28$ecmascript$29$__
}); //# sourceMappingURL=pages-api.js.map
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__2f2d0b._.js.map