const data = {
  aaa_read: "aaa_read",
  aaa_view: "aaa_view",
  aaa: "aaa",
  bbb: {
    bbb_read: "bbb_read",
    bbb_view: "bbb_view",
    bbb: "bbb",
    ddd: {
      ddd_read: "ddd_read",
      ddd_view: "ddd_view",
      ddd: "ddd",
      fff: {
        fff_read: "fff_read",
        fff_view: "fff_view",
        fff: "fff",
      },
      ggg: {
        ggg_read: "ggg_read",
        ggg_view: "ggg_view",
        ggg: "ggg",
      }
    }
  },
  ccc: {
    ccc_read: "ccc_read",
    ccc_view: "ccc_view",
    ccc: "ccc",
    eee: {
      eee_read: "eee_read",
      eee_view: "eee_view",
      eee: "eee",
      hhh: {
        hhh_read: "hhh_read",
        hhh_view: "hhh_view",
        hhh: "hhh",
      }
    }
  },
};
// 递归删除data数据中所有_read和_view的属性
const removeReadAndView = (obj, hash = new WeakMap()) => {
  if (typeof obj !== 'object' || obj === null) return obj;
  if (hash.has(obj)) return obj;
  hash.set(obj, true);

  const cleaned = { ...obj };

  for (let key in obj) {
    if (key.endsWith('_read') || key.endsWith('_view')) {
      Reflect.deleteProperty(cleaned, key);
    } else if (typeof obj[key] === 'object') {
      cleaned[key] = removeReadAndView(obj[key], hash);
    }
  }
  return cleaned;
}

const cleaned = removeReadAndView(data);
console.log(data)
console.log(JSON.stringify(cleaned, null, 2))


