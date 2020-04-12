---
title: My preliminary thoughts on Deno
draft: false
---

Deno (pronounced den-oh) is an upcoming Node.js replacement from the same creator. It has a number of nice features like native TypeScript support, built in utilities like `deno fmt`, and modern standard library APIs among other things. But it also has some poor design decisions in my opinion that I would like to detail here.

## Package management

The biggest issue in my opinion is the package management. It seems like Deno is taking a lot of inspiration from Go in general and this is the area it most shows up in. However, I think Go has a lot of issues especially with package management. The way things work in Deno is packages are specified with URLs, there is no central package repo, and dependencies are downloaded and cached globally. Even the standard library is imported from a url. The way to get around having to specify the same URL in multiple files is by having a `deps.ts` which is just a regular TypeScript file which lists all the dependencies as URLs and re-exports them. So the way things work in the real world is all of the dependencies are specified in `deps.ts` and each file just ends up importing everything from this special file.

The documentation says "This design circumvents a plethora of complexity spawned by package management software, centralized code repositories, and superfluous file formats" and we begin to see the philosophies of Go begin to corrode the design. The issue with Go is that it prioritizes simplicity over everything else, and when you are faced with an inherently complex and important problem like package management, it gets solved in a superficially simple and convoluted way that ends up just making things more complex. The reality is that having a solid package manager and central package repo *is* more work, but there is a lot of value in these things and it is worth it. The best demonstration of this is Rust with crates.io and cargo, which are both great tools and have really created a great packaging ecosystem, the only issue with them being that I wish packages on crates.io were namespaced.

For some concrete examples between the two approaches:

1. it seems like Go is finally starting to get a central packager repo, but it is kind of late and now it feels baked on
2. packages in the Rust ecosystem are easily discoverable and vetted
3. specifying packages with urls is inherently unreliable
