import express from 'express'
// import { omit } from 'lodash'
import next from 'next'

// import { aboutStats as aboutStatsRecord, aboutTeam } from '../../__fixtures__/about'
// import blogArticleRecords from '../../__fixtures__/blog'
// import contentWithHtml, { featureRecords, partnerRecords, techRecords } from '../../__fixtures__/common'
// import careerJobRecords, { careerPerks } from '../../__fixtures__/jobs'
// import trainingCourseCategoryRecords from '../../__fixtures__/training-categories'
// import trainingCourseRecords, { courseReviews as trainingCourseReviews } from '../../__fixtures__/trainings';
// import { PageKey, pageToQueryMap, QueryKey } from '../../src/libs/api';
// // import nextConf from '../../next.config'
// // This triggers issue with getConfig as next app should be initialized first
// // import { ITEMS_PER_PAGE } from '../../src/libs/constants'
// const ITEMS_PER_PAGE = 2;

const port = parseInt(process.env.PORT + '', 10) || 3000
// const dev = process.env.NODE_ENV !== 'production'
const app = next({
  /* dev */
  // @ts-ignore
  // conf: nextConf,
})
const handle = app.getRequestHandler()

// const shellObjectWithDataAndId = (obj: any) => ({
//   data: shellObjectWithId(obj),
// });

// const shellObjectWithId = (obj: any) => ({
//   id: obj.id,
//   attributes: {
//     ...omit(obj, 'id'),
//   },
// });

// const shellObject = (obj: any) => ({
//   data: {
//     attributes: obj,
//   },
// });


// type Variables = Record<string, any>;
// const getDataForBlogArticles = (variables: Variables) => {
//   let records = blogArticleRecords;
//   if (variables?.limit) {
//     records = records.slice(0, variables?.limit || ITEMS_PER_PAGE)
//   }
//   return {
//     meta: {
//       pagination: {
//         total: records.length,
//       },
//     },
//     items:
//       records.map(({ id, category, poster, ...rest }) => ({
//         id,
//         attributes: {
//           ...rest,
//           category: { data: { id: category.id, attributes: omit(category, 'id') } },
//           poster: { data: { attributes: poster } },
//         },
//       })),

//   };
// }
// const getDataForTrainingArticles = (variables: Variables) => {
//   let records = trainingCourseRecords;
//   if (variables?.limit) {
//     records = records.slice(0, variables?.limit || ITEMS_PER_PAGE)
//   }


//   return {
//     meta: {
//       pagination: {
//         total: records.length,
//       },
//     },
//     data:
//       records.map(({ id, ...rest }) => ({
//         id,
//         attributes: {
//           ...rest,
//         },
//       })),
//   };
// }

// // eslint-disable-next-line no-unused-vars
// const queryToDataMap: Record<QueryKey, (variables: any) => any> = {
//   'landing-hero': () => undefined,
//   'landing-service': () => undefined,
//   'landing-team': () => undefined,
//   'landing-benefit': () => undefined,
//   'landing-book': () => undefined,
//   'landing-client': () => undefined,
//   'landing-blog': () => undefined,
//   'setting': () => ({
//     data: {
//       attributes: {
//         defaultOGImage: shellObject({ url: 'https://example.com/example.jpg' }),
//         contactHref: 'https://example.com/',

//       },
//     },
//   }),
//   'tech': () => ({
//     data: {
//       attributes: {
//         items: techRecords.items.map(({ logo, ...restOfItem }) => ({
//           ...restOfItem,
//           logo: shellObject(logo),
//         })),
//       },
//     },
//   }),
//   'about-stats': () => shellObject(aboutStatsRecord),
//   'team-gallery': () => shellObject({
//     image_large_1: {
//       "alt": "",
//       "caption": "",
//       "url": "example.jpg",
//     },
//     image_large_2: {
//       "alt": "",
//       "caption": "",
//       "url": "example.jpg",
//     },
//     image_small_1: {
//       "alt": "",
//       "caption": "",
//       "url": "example.jpg",
//     },
//     image_small_2: {
//       "alt": "",
//       "caption": "",
//       "url": "example.jpg",
//     },
//   }),
//   'about-mentions': () => ({
//     data: {
//       attributes: {
//         items: partnerRecords.map(({ logo, ...restOfItem }) => ({ ...restOfItem, logo: shellObject(logo) })),
//       },
//     },
//   }),
//   'partners': () => ({
//     data: {
//       attributes: {
//         items: partnerRecords.map(({ logo, ...restOfItem }) => ({ ...restOfItem, image: shellObject(logo) })),
//       },
//     },
//   }),
//   'team': () => ({
//     data: {
//       attributes: {
//         items: aboutTeam.map(({ portrait, ...restOfItem }) => ({ ...restOfItem, portrait: shellObject(portrait) })),
//       },
//     },
//   }),
//   'product-info': () => {
//     return shellObject({
//       items: [{
//         sections: featureRecords.map((feature) => ({
//           id: feature.id,
//           pretitle: feature.pretitle,
//           title: feature.title,
//           description: feature.description,
//           url: feature.url,
//           poster: shellObject({
//             url: feature.poster,
//           }),
//           th1: feature.tabs[0].title,
//           th2: feature.tabs[1].title,
//           th3: feature.tabs[2].title,
//           tc1: feature.tabs[0].content,
//           tc2: feature.tabs[1].content,
//           tc3: feature.tabs[2].content,
//         })),
//       }],
//     })
//   },
//   'career-perks': () => ({
//     data: {
//       attributes: {
//         items: careerPerks.map(({ id, image, ...restOfRecord }) => ({
//           id,
//           ...restOfRecord,
//           image: shellObject(image),
//         })),
//       },
//     },
//   }),
//   'career-jobs': (variables) => {
//     let records = careerJobRecords;
//     if (variables?.limit) {
//       records = records.slice(0, variables?.limit || ITEMS_PER_PAGE)
//     }
//     return {
//       data: records.map(({ id, ...restOfRecord }) => ({ id, attributes: restOfRecord })),
//     };
//   },
//   'course-info': () => ({
//     data: {
//       attributes: {
//         url: 'https://example.com/course-info-url',
//       },
//     },
//   }),
//   'course-info-full': () => ({
//     data: {
//       attributes: {
//         url: 'https://example.com/course-info-url',
//         content: contentWithHtml('Course/InfoFull'),
//       },
//     },
//   }),
//   'course-categories': () => ({
//     data: trainingCourseCategoryRecords.map((m) => shellObjectWithId(m)),
//   }),
//   'course-reviews': () => ({
//     data: {
//       attributes: {
//         items: trainingCourseReviews.map(({
//           portrait,
//           thumbnail,
//           ...restOfItem
//         }) => ({
//           ...restOfItem,
//           portrait: shellObject(portrait),
//           thumbnail: shellObject(thumbnail),
//         })),
//       },
//     },
//   }),
//   'courses': getDataForTrainingArticles,
//   'course-details': ({ slug }) => {
//     const record = trainingCourseRecords.filter((f) => f.slug === slug)?.[0] || null;

//     if (!record) {
//       return { data: [] }
//     }

//     const { id, category, language, localizations, ...restOfRecord } = record;
//     return {
//       data: [
//         {
//           id,
//           attributes: {
//             ...restOfRecord,
//             category: shellObjectWithDataAndId(category),
//             language: shellObjectWithDataAndId(language),
//             localizations: { data: localizations.map((m) => shellObjectWithDataAndId(m)) },
//           },
//         },
//       ],
//     };
//   },
//   'blog-article': ({ slug }: { slug: string }) => {
//     const record = blogArticleRecords.filter((f) => f.slug === slug)?.[0] || null;

//     if (!record) {
//       return { data: [] }
//     }

//     const { id, category, localizations, poster, ogPoster, ...restOfRecord } = record;
//     return {
//       data: [
//         {
//           id,
//           attributes: {
//             ...restOfRecord,
//             category: shellObjectWithDataAndId(category),
//             poster: shellObjectWithDataAndId(poster),
//             ogPoster: shellObjectWithDataAndId(ogPoster),
//             localizations: { data: localizations.map((m) => shellObjectWithDataAndId(m)) },
//           },
//         },
//       ],
//     };
//   },
//   'blog-featured': () => ({
//     data: {
//       attributes: {
//         items:
//           blogArticleRecords.slice(0, 4).map(({ id, category, poster, ...rest }) => ({
//             id,
//             item: {
//               data: {
//                 attributes: {
//                   ...rest,
//                   category: { data: { id: category.id, attributes: omit(category, 'id') } },
//                   poster: { data: { attributes: poster } },
//                 },
//               },
//             },
//           })),
//       },
//     },
//   }),
//   'blog-articles': getDataForBlogArticles,
// };

// const graphqlReducer = (type: string, variables: Variables) => {
//   if (type.indexOf('page/') === 0) {
//     const page = type.split('page/')[1] as PageKey;
//     if (!Object.prototype.hasOwnProperty.call(pageToQueryMap, page)) {
//       throw new Error(`There is no page to query mapping for "${page}". Add to proceed.`);
//     }

//     const { queries } = pageToQueryMap[page];
//     const fullQueries = ['setting' as QueryKey].concat(queries);
//     return fullQueries.reduce<Record<string, any>>((ar, r, rid) => {
//       const key = `r${rid}`;
//       ar[key] = queryToDataMap[r](variables);
//       return ar;
//     }, {})
//   }

//   switch (type) {
//     case 'blog/articles': {
//       return getDataForBlogArticles(variables);
//     }
//     case 'course/courses': {
//       return getDataForTrainingArticles(variables);
//     }
//   }

//   throw new Error(`Oh no, graphql query was not intercepted for ${type}.`);
// }

app.prepare().then(() => {
  const server = express()
  server.use(express.json());

  // intercept graphql requests
  // server.post('/graphql', (req, res) => {
  //   // console.log('POST:GRAPHQL:BODY', req.body);

  //   const { variables = {}, type } = req.body;
  //   res.json({ data: graphqlReducer(type, variables) });
  // })

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, () => {
    // if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
});
