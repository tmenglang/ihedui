let URL = "https://49.232.158.198:10001";

let ROOT;
if (process.env.NODE_ENV !== "development") {
    ROOT = "/api";
} else {
    ROOT = URL;
}

exports.URL = URL; //代理指向地址
exports.ROOT = ROOT;