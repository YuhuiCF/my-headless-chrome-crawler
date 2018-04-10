'use strict';

const fse = require('fs-extra');
const HCCrawler = require('headless-chrome-crawler');
const CSVExporter = require('headless-chrome-crawler/exporter/csv');

(async () => {
  const FILE = './tmp/result.csv';
  await fse.ensureFile(FILE);

  const exporter = new CSVExporter({
    file: FILE,
    fields: ['response.url', 'response.status', 'links.length'],
  });

  const crawler = await HCCrawler.launch({
    maxDepth: 2,
    exporter,
  });
  // await crawler.queue('https://www.fahrzeug-reparatur.com/');
  // await crawler.queue('https://www.fairgarage.de/'); // might take quite a long time
  await crawler.queue('https://www.cardess.com/');
  await crawler.onIdle();
  await crawler.close();
})();
