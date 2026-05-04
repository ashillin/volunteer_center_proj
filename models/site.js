  const sites = [
    {siteName: "Valentine Ave", siteAddy: "2544 Valentine"}, 
    {siteName: "University Heights", siteAddy: "149th street 3rd Ave"}, 
    {siteName: "Fordham University", siteAddy: "Fordham Road"},
  ];

exports.add = (site) => {
    sites.push(site);
};

exports.get = (idx) => {
  return sites[idx];
};

exports.upsert = (site) => {
  if (site.id) {
    exports.update(site);
  } else {
    exports.add(site);
  }
};

exports.update = (site) => {
  sites[site.id] = site;
}
  exports.all = sites;