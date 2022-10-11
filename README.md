# Markdown blog

## SSG란?

- SSG(Static site Generation)은 빌드 타임에 페이지의 HTML을 생성합니다.
- 다르게 말하면 next build를 실행했을 때 HTML이 생성됩니다.
- 이렇게 생성된 HTML은 각각의 요청마다 재사용될 수 있고, **CDN**에 캐시되어 제공될 수 있습니다.

## Next.js에서는 SSG를 어떻게 구현할까요?

- 기본적으로 Next.js는 Static Generation을 제공합니다.
- 만약 외부 데이터를 불러와서 pre rendering을 해야하는 경우 `getStaticProps`와 `getStaticPaths` API를 이용해서 빌드 타임에 데이터를 불러와 pre rendering해줄 수 있습니다.

예시

```js
// pages/posts/[id].js

// Generates `/posts/1` and `/posts/2`
export async function getStaticPaths() {
  return {
    paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
    fallback: false, // can also be true or 'blocking'
  };
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(context) {
  return {
    // Passed to the page component as props
    props: { post: {} },
  };
}

export default function Post({ post }) {
  // Render post...
}
```

- getStaticProps: getStaticProps에 의해 반환된 props를 사용해서 빌드타임에 페이지를 pre rendering 합니다.
- getStaticPaths: Dynamic Routes를 사용하는 페이지를 pre rendering 합니다.
- getStaticProps, getStaticPaths는 서버에서 빌드 타임에만 호출되고 클라이언트에서는 호출되지 않습니다.
- 클라이언트 번들에서는 제거됩니다.[참고](https://next-code-elimination.vercel.app/)
