use neon::prelude::*;

fn hello(mut cx: FunctionContext) -> JsResult<JsString> {
    Ok(cx.string("hello node"))
}

fn arrayTest(mut cx: FunctionContext) -> JsResult<JsString> {
    let mut arr = [0; 1000000];
    for x in 0..1000000 {
        let num = i32::pow(x, 6);
        arr[x] = num;
    }
    Ok(cx.string("done!"))
}

fn calcTest(mut cx: FunctionContext) -> JsResult<JsString> {
    for x in 0..1000000 {
        let num = i32::pow(x, 6);
    }
    Ok(cx.string("done!"))
}

register_module!(mut cx, {
    cx.export_function("hello", hello);
    cx.export_function("arrayTest", arrayTest);
    cx.export_function("calcTest", calcTest)
});
