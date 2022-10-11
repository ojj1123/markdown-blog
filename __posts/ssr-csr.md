---
title: CSR / SSR with Next.js
date: '2022-10-11'
---

> 본 글은 [원티드 프리온보딩 챌린지 10월 사전 과제](https://www.wanted.co.kr/events/pre_challenge_fe_3)입니다.

### 1. CSR(Client-side Rendering)이란 무엇이며, 그것의 장단점에 대하여 설명해주세요.

**CSR(Client-side Rendering)은 브라우저 측에서 직접적으로 자바스크립트를 이용해 페이지를 렌더링하는 것**을 의미한다. 데이터 가져오기, 라우팅, 화면에 동적인 요소를 추가하기 등의 모든 로직이 서버에서가 아닌 클라이언트 즉, 런타임에 처리된다.

**장점**

1. 데이터를 자주 업데이터해야하는 상황에서 SSR보다 서버 부하를 줄일 수 있다.
2. JS가 처리할 작업이 적을 때는 server rendering 만큼의 빠른 성능을 보여준다.

**단점**

1. 어플리케이션의 규모가 커지면 커질수록 클라이언트에서 필요로 하는 자바스크립트 번들도 많아지게 된다. 필요한 번들 크기가 커지고 화면을 렌더링 하는데 더 많은 시간이 소요된다. 즉, TTI(Time to Interactive)가 길어져 화면을 보고 상호작용하기까지 시간이 걸리게 된다.
   ![image](https://user-images.githubusercontent.com/33178048/193198237-1d73d741-5860-452c-a7e7-09fd773b1ca6.png)

2. 검색 엔진의 크롤러가 크롤링하는데 어려움을 겪기 때문에 SEO의 문제를 겪을 수 있다.

### 2. SPA(Single Page Application)로 구성된 웹 앱에서 SSR(Server-side Rendering)이 필요한 이유에 대하여 설명해주세요.

어플리케이션의 규모가 커지면 커질수록 클라이언트에서 필요로 하는 자바스크립트 번들도 많아지게 된다. 그렇게 되면 FCP(First Contentful Paint)가 지연되고 TTI도 따라서 지연된다. 이때 SSR을 이용하여 FCP를 줄일 수 있다. SSR을 통해 서버에서 HTML을 미리 렌더링하고, 브라우저에서 자바스크립트를 실행해 미리 만들어둔 HTML에 필요한 요소나 데이터를 추가적으로 렌더링해줄 수 있다. 이것을 rehydration이라고 한다. 다만 rehydration을 이용한 SSR방식이 FCP를 향상해줄 수는 있지만 클라이언트에서 자바스크립트를 실행할 때까지 TTI가 지연될 수 있다는 단점이 있다.

### 3. Next.js 프로젝트를 세팅한 뒤 yarn start 스크립트를 실행했을 때 실행되는 코드를 nextjs github 레포지토리에서 찾은 뒤, 해당 파일에 대한 간단한 설명을 첨부해주세요.

`yarn start`를 실행했을 때 `next start` script가 실행된다.
`next start`는 production mode로 어플리케이션을 시작하도록 한다. [참고](https://nextjs.org/docs/api-reference/cli#production)

`yarn start`를 실행했을 때 실행되는 코드 : [https://github.com/vercel/next.js/blob/canary/packages/next/cli/next-start.ts](https://github.com/vercel/next.js/blob/canary/packages/next/cli/next-start.ts)

- `yarn start`를 실행하면 `next start`가 실행되고, `next-start.ts`파일의 `nextStart` 함수가 실행된다.
- `port`, `hostname`, `keepAliveTimeout` 옵션을 설정하여 `next start` 명령어를 실행할 수 있다.
- `nextStart` 함수가 실행되면 내부에서 `startServer` 가 호출된다.

```ts
// next-start.ts
const nextStart: cliCommand = (argv) => {

  ...

  startServer({
    dir,
    hostname: host,
    port,
    keepAliveTimeout,
  })
    .then(async (app) => {
      const appUrl = `http://${app.hostname}:${app.port}`
      Log.ready(`started server on ${host}:${app.port}, url: ${appUrl}`)
      await app.prepare()
    })
    .catch((err) => {
      console.error(err)
      process.exit(1)
    })
}
```

### 참고

- [Rendering on the Web](https://web.dev/rendering-on-the-web)
- [CSR(Client Side Rendering)과 SSR(Server Side Rendering)](https://github.com/baeharam/Must-Know-About-Frontend/blob/main/Notes/frontend/csr-ssr.md)
- [Next.js Docs](https://nextjs.org/docs/api-reference/cli#production)
