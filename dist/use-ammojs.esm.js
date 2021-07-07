import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { WorkerHelpers, CONSTANTS } from 'three-ammo';
export { BodyType, ConstraintType, ShapeFit, ShapeType } from 'three-ammo';
import { createAmmoWorker } from 'three-ammo/dist/threeammo-worker';
import { BufferGeometry, BufferAttribute, DynamicDrawUsage, Vector3, Matrix4, MathUtils } from 'three';
import { useFrame } from '@react-three/fiber';
import { AmmoDebugConstants, DefaultBufferSize } from 'ammo-debug-drawer';
export { AmmoDebugConstants } from 'ammo-debug-drawer';

var AmmoPhysicsContext = /*#__PURE__*/createContext(null);
function useAmmoPhysicsContext() {
  var context = useContext(AmmoPhysicsContext);

  if (!context) {
    throw new Error("Ammo Physics hook must be used within a <Physics /> Context");
  }

  return context;
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var runtime_1 = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined$1; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined$1) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined$1;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined$1;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined$1;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined$1, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined$1;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined$1;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined$1;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined$1;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined$1;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   module.exports 
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}
});

function removeUndefinedKeys(obj) {
  Object.keys(obj).forEach(function (key) {
    if (obj[key] === undefined) {
      delete obj[key];
    }
  });
  return obj;
} // Converts the AmmoDebugOptions into a bitmasked integer that is used by bullet

function ammoDebugOptionsToNumber(debugOptions) {
  var options = AmmoDebugConstants.NoDebug;

  if (debugOptions.DrawWireframe) {
    options |= AmmoDebugConstants.DrawWireframe;
  }

  if (debugOptions.DrawAabb) {
    options |= AmmoDebugConstants.DrawAabb;
  }

  if (debugOptions.DrawFeaturesText) {
    options |= AmmoDebugConstants.DrawFeaturesText;
  }

  if (debugOptions.NoHelpText) {
    options |= AmmoDebugConstants.NoHelpText;
  }

  if (debugOptions.DrawText) {
    options |= AmmoDebugConstants.DrawText;
  }

  if (debugOptions.ProfileTimings) {
    options |= AmmoDebugConstants.ProfileTimings;
  }

  if (debugOptions.EnableSatComparison) {
    options |= AmmoDebugConstants.EnableSatComparison;
  }

  if (debugOptions.DisableBulletLCP) {
    options |= AmmoDebugConstants.DisableBulletLCP;
  }

  if (debugOptions.EnableCCD) {
    options |= AmmoDebugConstants.EnableCCD;
  }

  if (debugOptions.DrawConstraints) {
    options |= AmmoDebugConstants.DrawConstraints;
  }

  if (debugOptions.DrawConstraintLimits) {
    options |= AmmoDebugConstants.DrawConstraintLimits;
  }

  if (debugOptions.FastWireframe) {
    options |= AmmoDebugConstants.FastWireframe;
  }

  if (debugOptions.DrawNormals) {
    options |= AmmoDebugConstants.DrawNormals;
  }

  if (debugOptions.MAX_DEBUG_DRAW_MODE) {
    options |= AmmoDebugConstants.MAX_DEBUG_DRAW_MODE;
  }

  return options;
}

var DEFAULT_DEBUG_MODE = {
  DrawWireframe: true
};
function Physics(_ref) {
  var drawDebug = _ref.drawDebug,
      _ref$drawDebugMode = _ref.drawDebugMode,
      drawDebugMode = _ref$drawDebugMode === void 0 ? DEFAULT_DEBUG_MODE : _ref$drawDebugMode,
      gravity = _ref.gravity,
      epsilon = _ref.epsilon,
      fixedTimeStep = _ref.fixedTimeStep,
      maxSubSteps = _ref.maxSubSteps,
      solverIterations = _ref.solverIterations,
      children = _ref.children;

  var _useState = useState(),
      physicsState = _useState[0],
      setPhysicsState = _useState[1];

  useEffect(function () {
    var uuids = [];
    var object3Ds = {};
    var uuidToIndex = {};
    var bodyOptions = {};
    var ammoWorker = createAmmoWorker();
    var workerHelpers = WorkerHelpers(ammoWorker);
    var sharedArrayBuffer = new SharedArrayBuffer(4 * CONSTANTS.BUFFER_CONFIG.HEADER_LENGTH + //header
    4 * CONSTANTS.BUFFER_CONFIG.BODY_DATA_SIZE * CONSTANTS.BUFFER_CONFIG.MAX_BODIES + //matrices
    4 * CONSTANTS.BUFFER_CONFIG.MAX_BODIES //velocities
    );
    var headerIntArray = new Int32Array(sharedArrayBuffer, 0, CONSTANTS.BUFFER_CONFIG.HEADER_LENGTH);
    var objectMatricesIntArray = new Int32Array(sharedArrayBuffer, CONSTANTS.BUFFER_CONFIG.HEADER_LENGTH * 4, CONSTANTS.BUFFER_CONFIG.BODY_DATA_SIZE * CONSTANTS.BUFFER_CONFIG.MAX_BODIES);
    var objectMatricesFloatArray = new Float32Array(sharedArrayBuffer, CONSTANTS.BUFFER_CONFIG.HEADER_LENGTH * 4, CONSTANTS.BUFFER_CONFIG.BODY_DATA_SIZE * CONSTANTS.BUFFER_CONFIG.MAX_BODIES);
    objectMatricesIntArray[0] = CONSTANTS.BUFFER_STATE.UNINITIALIZED;
    var debugSharedArrayBuffer = new SharedArrayBuffer(4 + 2 * DefaultBufferSize * 4);
    var debugIndex = new Uint32Array(debugSharedArrayBuffer, 0, 4);
    var debugVertices = new Float32Array(debugSharedArrayBuffer, 4, DefaultBufferSize);
    var debugColors = new Float32Array(debugSharedArrayBuffer, 4 + DefaultBufferSize, DefaultBufferSize);
    var debugGeometry = new BufferGeometry();
    debugGeometry.setAttribute("position", new BufferAttribute(debugVertices, 3).setUsage(DynamicDrawUsage));
    debugGeometry.setAttribute("color", new BufferAttribute(debugColors, 3).setUsage(DynamicDrawUsage));
    ammoWorker.postMessage({
      type: CONSTANTS.MESSAGE_TYPES.INIT,
      worldConfig: removeUndefinedKeys({
        debugDrawMode: ammoDebugOptionsToNumber(drawDebugMode),
        gravity: gravity && new Vector3(gravity[0], gravity[1], gravity[2]),
        epsilon: epsilon,
        fixedTimeStep: fixedTimeStep,
        maxSubSteps: maxSubSteps,
        solverIterations: solverIterations
      }),
      sharedArrayBuffer: sharedArrayBuffer
    });
    var workerInitPromise = new Promise(function (resolve) {
      ammoWorker.onmessage = /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(event) {
          var uuid;
          return runtime_1.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (event.data.type === CONSTANTS.MESSAGE_TYPES.READY) {
                    resolve({
                      workerHelpers: workerHelpers,
                      debugGeometry: debugGeometry,
                      debugSharedArrayBuffer: debugSharedArrayBuffer,
                      bodyOptions: bodyOptions,
                      uuids: uuids,
                      headerIntArray: headerIntArray,
                      object3Ds: object3Ds,
                      objectMatricesFloatArray: objectMatricesFloatArray,
                      uuidToIndex: uuidToIndex,
                      debugIndex: debugIndex,
                      addBody: addBody,
                      removeBody: removeBody,
                      addConstraint: addConstraint,
                      addShapes: addShapes,
                      updateBody: updateBody
                    });
                  } else if (event.data.type === CONSTANTS.MESSAGE_TYPES.BODY_READY) {
                    uuid = event.data.uuid;
                    uuids.push(uuid);
                    uuidToIndex[uuid] = event.data.index;
                  }

                case 1:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function (_x) {
          return _ref2.apply(this, arguments);
        };
      }();
    });
    workerInitPromise.then(setPhysicsState);

    function addBody(uuid, mesh, options) {
      if (options === void 0) {
        options = {};
      }

      removeUndefinedKeys(options);
      bodyOptions[uuid] = options;
      object3Ds[uuid] = mesh;
      workerHelpers.addBody(uuid, mesh, options);
    }

    function updateBody(uuid, options) {
      removeUndefinedKeys(options);
      workerHelpers.updateBody(uuid, options);
    }

    function removeBody(uuid) {
      uuids.splice(uuids.indexOf(uuid), 1);
      delete uuidToIndex[uuid];
      delete bodyOptions[uuid];
      delete object3Ds[uuid];
      workerHelpers.removeBody(uuid);
    }

    function addShapes(bodyUuid, shapesUuid, mesh, options) {
      removeUndefinedKeys(options);
      workerHelpers.addShapes(bodyUuid, shapesUuid, mesh, options);
    }

    function addConstraint(constraintId, bodyUuid, targetUuid, options) {
      removeUndefinedKeys(options);
      workerHelpers.addConstraint(constraintId, bodyUuid, targetUuid, options);
    }

    return function () {
      ammoWorker.terminate();
      setPhysicsState(undefined);
    };
  }, []);
  useFrame(function () {
    var transform = new Matrix4();
    var inverse = new Matrix4();
    var matrix = new Matrix4();
    var scale = new Vector3();

    if (!physicsState) {
      return;
    }

    var debugGeometry = physicsState.debugGeometry,
        bodyOptions = physicsState.bodyOptions,
        uuids = physicsState.uuids,
        headerIntArray = physicsState.headerIntArray,
        object3Ds = physicsState.object3Ds,
        objectMatricesFloatArray = physicsState.objectMatricesFloatArray,
        uuidToIndex = physicsState.uuidToIndex,
        debugIndex = physicsState.debugIndex;

    if (Atomics.load(headerIntArray, 0) === CONSTANTS.BUFFER_STATE.READY) {
      for (var i = 0; i < uuids.length; i++) {
        var uuid = uuids[i];
        var type = bodyOptions[uuid].type ? bodyOptions[uuid].type : CONSTANTS.TYPE.DYNAMIC;
        var object3D = object3Ds[uuid];

        if (type === CONSTANTS.TYPE.DYNAMIC) {
          matrix.fromArray(objectMatricesFloatArray, uuidToIndex[uuid] * CONSTANTS.BUFFER_CONFIG.BODY_DATA_SIZE);
          inverse.copy(object3D.parent.matrixWorld).invert();
          transform.multiplyMatrices(inverse, matrix);
          transform.decompose(object3D.position, object3D.quaternion, scale);
        } else {
          objectMatricesFloatArray.set(object3D.matrixWorld.elements, uuidToIndex[uuid] * CONSTANTS.BUFFER_CONFIG.BODY_DATA_SIZE);
        } // print velocities
        // console.log(
        //   uuid,
        //   objectMatricesFloatArray[indexes[uuid] * BUFFER_CONFIG.BODY_DATA_SIZE + 16],
        //   objectMatricesFloatArray[indexes[uuid] * BUFFER_CONFIG.BODY_DATA_SIZE + 17]
        // );
        // print coliisions
        // const collisions = [];
        // for (let j = 18; j < 26; j++) {
        //   const collidingIndex = objectMatricesIntArray[uuidToIndex[uuid] * BUFFER_CONFIG.BODY_DATA_SIZE + j];
        //   if (collidingIndex !== -1) {
        //     collisions.push(IndexToUuid[collidingIndex]);
        //   }
        // }
        // console.log(uuid, collisions);

      }

      Atomics.store(headerIntArray, 0, CONSTANTS.BUFFER_STATE.CONSUMED);
    }
    /* DEBUG RENDERING */


    var index = Atomics.load(debugIndex, 0);

    if (!!index) {
      debugGeometry.attributes.position.needsUpdate = true;
      debugGeometry.attributes.color.needsUpdate = true;
      debugGeometry.setDrawRange(0, index);
    }

    Atomics.store(debugIndex, 0, 0);
  });
  useEffect(function () {
    if (physicsState) {
      if (drawDebug) {
        workerHelpers.enableDebug(true, physicsState.debugSharedArrayBuffer);
      } else {
        workerHelpers.enableDebug(false, physicsState.debugSharedArrayBuffer);
      }
    }
  }, [drawDebug, physicsState]);

  if (!physicsState) {
    return null;
  }

  var workerHelpers = physicsState.workerHelpers,
      debugGeometry = physicsState.debugGeometry;
  return React.createElement(AmmoPhysicsContext.Provider, {
    value: _extends({}, workerHelpers, {
      // workerHelpers Overrides
      addBody: physicsState.addBody,
      removeBody: physicsState.removeBody,
      addShapes: physicsState.addShapes,
      addConstraint: physicsState.addConstraint,
      updateBody: physicsState.updateBody,
      object3Ds: physicsState.object3Ds
    })
  }, drawDebug && React.createElement("lineSegments", {
    geometry: debugGeometry,
    frustumCulled: false,
    renderOrder: 999
  }, React.createElement("lineBasicMaterial", {
    attach: "material",
    vertexColors: true,
    depthTest: true
  })), children);
}

function createPhysicsApi(physicsContext, bodyUUID, shapesUUID) {
  return {
    updateBodyOptions: function updateBodyOptions(options) {
      physicsContext.updateBody(bodyUUID, options);
    },
    getPosition: function getPosition() {
      return physicsContext.object3Ds[bodyUUID].position;
    },
    setPosition: function setPosition(position) {
      physicsContext.bodySetMotionState(bodyUUID, position);
    },
    getRotation: function getRotation() {
      return physicsContext.object3Ds[bodyUUID].quaternion;
    },
    setRotation: function setRotation(rotation) {
      physicsContext.bodySetMotionState(bodyUUID, undefined, rotation);
    },
    setMotionState: function setMotionState(position, rotation) {
      physicsContext.bodySetMotionState(bodyUUID, position, rotation);
    },
    setLinearVelocity: function setLinearVelocity(velocity) {
      physicsContext.bodySetLinearVelocity(bodyUUID, velocity);
    },
    applyImpulse: function applyImpulse(impulse, relativeOffset) {
      physicsContext.bodyApplyImpulse(bodyUUID, impulse, relativeOffset);
    },
    applyForce: function applyForce(force, relativeOffset) {
      physicsContext.bodyApplyForce(bodyUUID, force, relativeOffset);
    },
    setShapesOffset: function setShapesOffset(offset) {
      physicsContext.bodySetShapesOffset(bodyUUID, offset);
    }
  };
}

function usePhysics(options, object3D) {
  var ref = useRef();
  var physicsContext = useAmmoPhysicsContext();
  var addBody = physicsContext.addBody,
      addShapes = physicsContext.addShapes,
      removeBody = physicsContext.removeBody;

  var _useState = useState(function () {
    return MathUtils.generateUUID();
  }),
      bodyUUID = _useState[0];

  var _useState2 = useState(function () {
    return MathUtils.generateUUID();
  }),
      shapesUUID = _useState2[0];

  useEffect(function () {
    var objectToUse = object3D ? object3D : ref.current;

    if (typeof options === "function") {
      options = options();
    }

    var _options = options,
        bodyType = _options.bodyType,
        shapeType = _options.shapeType,
        shapeConfig = _options.shapeConfig,
        position = _options.position,
        mesh = _options.mesh,
        rest = _objectWithoutPropertiesLoose(_options, ["bodyType", "shapeType", "shapeConfig", "position", "mesh"]);

    if (position) {
      objectToUse.position.set(position[0], position[1], position[2]);
      objectToUse.updateMatrixWorld();
    }

    addBody(bodyUUID, objectToUse, _extends({
      type: bodyType
    }, rest));
    var meshToUse = mesh ? mesh : objectToUse;
    addShapes(bodyUUID, shapesUUID, meshToUse, _extends({
      type: shapeType
    }, shapeConfig));
    return function () {
      removeBody(bodyUUID);
    };
  }, []);
  return [ref, createPhysicsApi(physicsContext, bodyUUID)];
}

export { AmmoPhysicsContext, Physics, useAmmoPhysicsContext, usePhysics };
//# sourceMappingURL=use-ammojs.esm.js.map
