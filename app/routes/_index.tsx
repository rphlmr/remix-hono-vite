import {
  unstable_createMemoryUploadHandler,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  type MetaFunction,
  unstable_parseMultipartFormData,
  defer,
} from "@remix-run/node";
import {
  Await,
  Form,
  json,
  useActionData,
  useLoaderData,
} from "@remix-run/react";
import { Suspense } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export function loader({ context }: LoaderFunctionArgs) {
  const { appVersion } = context;
  const message = "Hello World from Remix Vite loader";
  console.log(message, appVersion);
  return defer({
    message,
    appVersion,
    lastNews: (async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return [
        { id: 1, title: "Remix Vite is stable!" },
        { id: 2, title: "Remix SPA is stable!" },
        { id: 3, title: "Remix Hono is awesome!" },
      ];
    })(),
  });
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await unstable_parseMultipartFormData(
    request,
    unstable_createMemoryUploadHandler()
  );
  console.log("file", formData.get("file"));

  return json({ fileName: (formData.get("file") as File).name });
};

export default function Index() {
  const loaderData = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  return (
    <main className="flex flex-col items-center gap-4 py-4">
      <h1 className="text-purple-500 text-3xl font-bold">
        Welcome to Remix Hono Vite !
      </h1>
      <a
        target="_blank"
        href="https://remix.run/docs/en/main/future/vite"
        rel="noreferrer"
        className="font-bold text-yellow-500"
      >
        Read the Remix Docs about Vite
      </a>

      <div className="border-2 flex flex-col rounded-md p-4 gap-4">
        <h2 className="text-xl font-bold">Debug zone</h2>

        <div className="border-2 flex flex-col rounded-md p-4 gap-2">
          <h2 className="text-md font-bold">Loader</h2>
          <pre className="text-sm">{JSON.stringify(loaderData, null, 2)}</pre>
        </div>

        <div className="border-2 flex flex-col rounded-md p-4 gap-2">
          <h2 className="text-md font-bold">Deferred loader</h2>
          <LastNews />
        </div>

        <div className="border-2 flex flex-col rounded-md p-4 gap-2">
          <h2 className="text-md font-bold">HMR</h2>
          <label>
            Should persist state across HMR
            <input type="text" placeholder="HMR test" className="ml-2" />
          </label>
          <p>
            This input should persist its value across HMR
            <br />
            Try to change the file and see if the value is still here
          </p>
        </div>

        <div className="border-2 flex flex-col rounded-md p-4 gap-2">
          <h2 className="text-md font-bold">Action</h2>
          <Form
            encType="multipart/form-data"
            method="POST"
            className="flex w-fit flex-col rounded-md border border-white bg-zinc-900 p-4 text-white"
          >
            <label className="text-white">
              Upload a file
              <input type="file" accept="image/*" name="file" />
            </label>
            <button
              type="submit"
              className="w-fit rounded-md bg-white p-2 text-black"
            >
              Submit
            </button>
          </Form>
          <pre className="text-sm">{JSON.stringify(actionData, null, 2)}</pre>
        </div>
      </div>
      <button
        className="w-fit rounded-md bg-white p-2 text-black"
        onClick={() => location.reload()}
      >
        Reload the page
      </button>
    </main>
  );
}

export function LastNews() {
  const { lastNews } = useLoaderData<typeof loader>();

  return (
    <Suspense
      fallback={
        <ul className="animate-pulse">
          <li>Loading last news</li>
          <li>...</li>
          <li>...</li>
        </ul>
      }
    >
      <Await resolve={lastNews}>
        {(lastNews) => (
          <ul>
            {lastNews.map((news) => (
              <li key={news.id}>{news.title}</li>
            ))}
          </ul>
        )}
      </Await>
    </Suspense>
  );
}
