import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import Layout from '../components/Layout';

const PostLink = (props) => (
  <li key={props.id}>
    <Link as={`/p/${props.id}`} href={`/post?id=${props.id}`}>
      <a>{props.title}</a>
    </Link>
    <style jsx>{`
      a {
        font-family: "Arial";
      }

      ul {
        padding: 0;
      }

      li {
        list-style: none;
        margin: 5px 0;
      }

      a,
      a:visited {
        text-decoration: none;
        color: blue;
      }

      a:hover {
        opacity: 0.6;
      }
    `}</style>
  </li>
);

const Index = (props) => (
  <Layout>
    <h1>Next.js</h1>
    {props.shows.map(({ show }) => (
      <PostLink key={show.id} id={show.id} title={show.name} />
    ))}
    <style jsx>{`
      h1 {
        font-family: "Arial";
      }
    `}</style>
  </Layout>
);

Index.getInitialProps = async function() {
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman');
  const data = await res.json();

  console.log(`Show data fetched. Count: ${data.length}`);

  return {
    shows: data,
  };
}

export default Index;
