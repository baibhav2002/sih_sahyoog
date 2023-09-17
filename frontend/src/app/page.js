import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="w-full">
        <div className="relative isolate px-6 lg:px-8">
          <div className="absolute rounded-full w-[100px] z-10 h-[100px] bg-[#2020ff] blur-3xl top-[25%] left-[60%] -translate-y-1/2 -translate-x-1/2"></div>
          <div className="absolute rounded-full w-[100px] z-10 h-[100px] bg-[#ff2020] blur-3xl top-[60%] left-[30%] -translate-y-1/2 -translate-x-1/2"></div>
          <div className="absolute rounded-full w-[100px] z-10 h-[100px] bg-[#5820ff] blur-3xl top-[20%] left-[10%] -translate-y-1/2 -translate-x-1/2"></div>
          <div className="absolute rounded-full w-[100px] z-10 h-[100px] bg-[#20ff32] blur-3xl top-[80%] left-[80%] -translate-y-1/2 -translate-x-1/2"></div>
          <div className="absolute rounded-full w-[100px] z-10 h-[100px] bg-[#ffff20] blur-3xl top-[70%] left-[5%] -translate-y-1/2 -translate-x-1/2"></div>
          <div className="absolute rounded-full w-[100px] z-10 h-[100px] bg-[#d220ff] blur-3xl top-[40%] left-[90%] -translate-y-1/2 -translate-x-1/2"></div>
          <div className="mx-auto max-w-3xl relative z-30 py-32 sm:py-48 lg:py-56">
            <div className="text-center">
              <h3 className="text-4xl pb-3 font-bold tracking-tight text-gray-900 sm:text-6xl">
                Welcome To <span className="text-indigo-600">सहयोग</span>
              </h3>
              <p className="text-sm md:text-lg tracking-tighter text-gray-600">
                Introducing our integrated platform for students, fostering peer
                learning and cross-university research. We offer a plagiarism
                check feature and leverage recommendation systems to curate
                personalized project feeds. Explore post-research works,
                collaborations, and academic event announcements. Easily filter
                projects by keywords and ratings. Students can log in under
                their college, while an admin panel ensures project
                authenticity. Join us to amplify your academic journey and
                collaborations!
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  href="/register"
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Get started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-hidden bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:pr-8 lg:pt-4">
              <div className="lg:max-w-lg">
                <h2 className="text-base font-semibold leading-7 text-indigo-600"></h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  A better workflow
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Maiores impedit perferendis suscipit eaque, iste dolor
                  cupiditate blanditiis ratione.
                </p>
                <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                  <div className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900">
                      <svg
                        className="absolute left-1 top-1 h-5 w-5 text-indigo-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.5 17a4.5 4.5 0 01-1.44-8.765 4.5 4.5 0 018.302-3.046 3.5 3.5 0 014.504 4.272A4 4 0 0115 17H5.5zm3.75-2.75a.75.75 0 001.5 0V9.66l1.95 2.1a.75.75 0 101.1-1.02l-3.25-3.5a.75.75 0 00-1.1 0l-3.25 3.5a.75.75 0 101.1 1.02l1.95-2.1v4.59z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Integrated Learning Platform :
                    </dt>
                    <dd className="inline">
                      This comprehensive tool enhances student learning.
                      Features include a plagiarism checker, cross-university
                      research facilitation, and project curation. It promotes
                      academic integrity, project discovery, and admin control.
                    </dd>
                  </div>
                  <div className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900">
                      <svg
                        className="absolute left-1 top-1 h-5 w-5 text-indigo-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Student Engagement Hub :
                    </dt>
                    <dd className="inline">
                      This platform encourages collaboration with plagiarism
                      checks, personalized project suggestions, and event
                      updates. It ensures academic integrity and admin
                      validation via college-specific logins.
                    </dd>
                  </div>
                  <div className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900">
                      <svg
                        className="absolute left-1 top-1 h-5 w-5 text-indigo-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M4.632 3.533A2 2 0 016.577 2h6.846a2 2 0 011.945 1.533l1.976 8.234A3.489 3.489 0 0016 11.5H4c-.476 0-.93.095-1.344.267l1.976-8.234z" />
                        <path
                          fillRule="evenodd"
                          d="M4 13a2 2 0 100 4h12a2 2 0 100-4H4zm11.24 2a.75.75 0 01.75-.75H16a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75h-.01a.75.75 0 01-.75-.75V15zm-2.25-.75a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75H13a.75.75 0 00.75-.75V15a.75.75 0 00-.75-.75h-.01z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Academic Empowerment :
                    </dt>
                    <dd className="inline">
                      Focusing on integrity, it offers plagiarism checks and
                      fosters inter-university research. Students get
                      personalized project suggestions, easy project discovery,
                      and event updates. Admins validate projects
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            <img
              src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
              alt="Product screenshot"
              className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
              width={2432}
              height={1442}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
