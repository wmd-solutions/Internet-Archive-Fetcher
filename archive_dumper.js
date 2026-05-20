const apiUrl = "https://archive.org/metadata";

async function getMetadata(identifier) {
  const metadataUrl = apiUrl + "/" + identifier;
  response = await fetch(metadataUrl);
  if (response !== undefined) {
    const data = await response.json();
    return {
      identifier,
      cdn1: "https://" + data.d1 + data.dir,
      cdn2: "https://" + data.d2 + data.dir,
      files: data.files,
      title: data.metadata.title,
      description: data.metadata.description,
    };
  } else {
    return undefined;
  }
}

function toIdentifier(s) {
  const url = /^https?:\/\/archive.org\/(.+)/;
  const identifier = /^[A-Za-z0-9_\-.]+$/;
  const match = s.match(url);
  if (match === null) {
    if (identifier.test(s)) {
      return s;
    } else {
      return undefined;
    }
  } else {
    return match[1].split("/")[1];
  }
}

function toPermalink(identifer, path) {
  return "https://archive.org/download/" + identifer + "/" + path;
}

function getFileLinks(metadata) {
  if (metadata === undefined) {
    return [];
  }
  const files = [];
  metadata.files.forEach((f) => {
    // TODO: also use the second cdn
    files.push(metadata.cdn1 + "/" + f.name);
  })
  return files;
}

function getExtensions(links) {
  const exts = new Set();
  links.forEach((s) => {
    const ext = s.split('.').pop();
    exts.add(ext);
  })
  return exts;
}

function filterExtensions(exts, links) {
  const matched = [];
  links.forEach((s) => {
    const ext = s.split('.').pop();
    if (exts.has(ext)) {
      matched.push(s);
    }
  })
  return matched;
}

function download(content, mimeType, filename){
  const downloadLink = document.createElement('a')
  downloadLink.setAttribute('href', URL.createObjectURL(new Blob([content], {type: mimeType})))
  downloadLink.setAttribute('download', filename)
  downloadLink.click()
}

/*document.querySelector("#id-url").oninput = function(e) {
  const identifer = toIdentifier(e.target.value);
  const lookup = document.querySelector("#id-lookup");
  if (identifer !== undefined) {
    e.target.classList.remove("is-invalid");
    e.target.classList.add("is-valid");
    lookup.removeAttribute("disabled");
  } else {
    e.target.classList.remove("is-valid");
    e.target.classList.add("is-invalid");
    lookup.setAttribute("disabled", "disabled");
  }
};

document.querySelector("#id-lookup").onclick = function() {
  const expt = document.getElementById("id-export")
  const url = document.querySelector("#id-url").value;
  const identifier = toIdentifier(url);
  if (identifier !== undefined) {
    getMetadata(identifier).then((res) => {
      const links = getFileLinks(res);
      const exts = getExtensions(links);
      const filtered = filterExtensions(exts, links);
      const results = document.querySelector("#id-results");
      results.removeAttribute("disabled");
      expt.removeAttribute("disabled");
      results.value = filtered.join("\n");
    })
  }
};

document.querySelector("#id-export").onclick = function() {
  const content = document.getElementById("id-results").value
  const filename = document.getElementById("id-url").value
    .replace('https://archive.org/details/','')
    .replace('/','_')
  download(content, "text/plain", filename)
};*/

/**
 * ASCII to Unicode (decode Base64 to original data)
 * @param {string} b64
 * @return {string}
 */
function atou(b64) {
  return decodeURIComponent(escape(atob(b64)));
}
/**
 * Unicode to ASCII (encode data to Base64)
 * @param {string} data
 * @return {string}
 */
function utoa(data) {
  return btoa(unescape(encodeURIComponent(data)));
}

function getReadableFileSizeString(fileSizeInBytes) {
  if ( isNaN( fileSizeInBytes ) )
  {
    return '0b';
  }
  var i = -1;
  var byteUnits = [' kB', ' MB', ' GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  do {
    fileSizeInBytes /= 1024;
    i++;
  } while (fileSizeInBytes > 1024);

  return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
}

function getArchiveFileLinks(metadata, tableID) {
  if (metadata === undefined) {
    return [];
  }
  console.log(metadata);
  const files = [];
  let exclude = [
    metadata.identifier + '_archive.torrent',
    metadata.identifier + '_files.xml',
    metadata.identifier + '_meta.sqlite',
    metadata.identifier + '_meta.xml',
    '__ia_thumb.jpg'
  ];

  let thumb = metadata.identifier + '.thumbs';
  files.push('<table id="' + tableID + '" class="table table-hover"><thead class="text-center"><tr><th scope="col" class="text-start">Fájlnév <i class="fa fa-fw fa-sort"></i></th><th class="text-nowrap" scope="col">Friss <i class="fa fa-fw fa-sort"></i></th><th class="text-nowrap" scope="col">Méret <i class="fa fa-fw fa-sort"></i></th><th scope="col">Letöltési helyek</th></tr></thead><tbody>');
  var linkstyle = "fs-6 link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover";
  metadata.files.forEach((f) => {
    if ( !exclude.includes(f.name) && ( f.name.substring(0, thumb.length) != thumb ) )
    {
      files.push('<tr><td class="fs-6 align-middle" data-cmp="' + utoa(f.name) + '">' + f.name + '</td><td data-cmp="' + utoa(isNaN(f.mtime) ? 0 : f.mtime) + '"></td><td class="align-middle text-center text-nowrap" data-cmp="' + utoa(isNaN(f.size) ? 0 : f.size) + '">' + getReadableFileSizeString(f.size) + '</td><td class="align-middle text-center text-nowrap"><a class="' + linkstyle + '" href="' + metadata.cdn1 + "/" + f.name + '" target="_blank">Szerver1</a> <i class="fa-solid fa-grip-lines-vertical text-primary text-opacity-25"></i> <a class="' + linkstyle + '" href="' + metadata.cdn2 + "/" + f.name + '" target="_blank">Szerver2</a></td>');
    }
  })
  files.push('</tbody></table>');
  return files;
}

function findTorrent( metadata )
{
  let torrent = metadata.identifier + '_archive.torrent';
  var result = [];
  metadata.files.forEach((f) => {
    if ( f.name == torrent )
    {
      result = [ metadata.cdn1 + "/" + f.name, metadata.cdn2 + "/" + f.name ];
    }
  });

  return result;
}

function tableSort( table, columIndex, comparer )
{
  var ths = table.getElementsByTagName('th');
  for (let i = 0; i < ths.length; i++) {
    let tagi = ths[i].getElementsByTagName('i');
    if ( tagi.length > 0 )
    {
      tagi[0].classList.remove("fa-sort-asc");
      tagi[0].classList.remove("fa-sort-desc");
      tagi[0].classList.add("fa-sort");
    }
  }

  var rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  switching = true;
  dir = "asc";
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[columIndex];
      y = rows[i + 1].getElementsByTagName("TD")[columIndex];

      let cmp1 = atou( x.getAttribute('data-cmp') );
      let cmp2 = atou( y.getAttribute('data-cmp') );

      if ( comparer(cmp1, cmp2, dir) )
      {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount ++;
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }

  let tagi = ths[columIndex].getElementsByTagName('i');
  tagi[0].classList.remove("fa-sort");
  tagi[0].classList.add("fa-sort-" + dir);
}

function StrCompare( str1, str2, direction )
{
  if (direction == "asc") {
    if (str1.toLowerCase() > str2.toLowerCase()) {
      return true;
    }
  } else if (direction == "desc") {
    if (str1.toLowerCase() < str2.toLowerCase()) {
      return true;
    }
  }
  return false;
}

function NumCompare( num1, num2, direction )
{
  if (direction == "asc") {
    if (num1 > num2) {
      return true;
    }
  } else if (direction == "desc") {
    if (num1 < num2) {
      return true;
    }
  }
  return false;
}

function ArchiveObj( archiveMain )
{
  var obj = { };

  obj.archiveMain = archiveMain;
  obj.archiveMainTableID = obj.archiveMain.getAttribute('id') + 'table';
  obj.archiveHeader = document.querySelector( archiveMain.getAttribute('data-header') );
  obj.archiveUrl = archiveMain.getAttribute('data-archive');
  obj.identifier = toIdentifier( obj.archiveUrl );
  obj.archive = {};
  
  if ( obj.identifier !== undefined )
  {
    getMetadata( obj.identifier ).then((res) => {
      obj.archive.links = getFileLinks(res);
      obj.archive.exts = getExtensions(obj.archive.links);
      obj.archive.filtered = filterExtensions(obj.archive.exts, obj.archive.links);
      obj.archive.downloads = getArchiveFileLinks(res, obj.archiveMainTableID);
      obj.archive.title = res.title;
      obj.archive.description = res.description;

      obj.archiveHeader.querySelector( '.spinner-border' ).style.display = "none";
      obj.archiveHeader.querySelector( '.archive-title' ).innerHTML = obj.archive.title;
      obj.archiveHeader.querySelector( '.archive-description' ).innerHTML = obj.archive.description;

      let torrent = findTorrent( res );
      if ( torrent.length > 0 )
      {
        let torrentSection = '<span>Torrentes letöltés: '
        for (let i = 0; i < torrent.length; i++) {
          torrentSection += '<a href="' + torrent[i] + '" class="fs-6 link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">Szerver ' + (i + 1) + '</a> ';
        }
        torrentSection += '</span>';
        obj.archiveHeader.insertAdjacentHTML('beforeend', torrentSection);
      }

      obj.archiveMain.querySelector( '.archive-links' ).innerHTML = obj.archive.downloads.join("");

      obj.archiveMainTable = document.querySelector( '#' + obj.archiveMainTableID );
      var thList = obj.archiveMainTable.querySelectorAll('th');
      for ( let i = 0; i < thList.length - 1; i++ )
      {
        thList[ i ].setAttribute( 'role', 'button' );
        thList[ i ].onclick = function( ){
          tableSort( obj.archiveMainTable, i, i == 0 ? StrCompare : NumCompare );
        };
      }
    });
  }

  return obj;
}

(function(){
  var archiveContainers = document.querySelectorAll(".archive-main");
  var archives = [ ];
  for ( var i = 0; i < archiveContainers.length; i++ )
  {
    archives.push( new ArchiveObj( archiveContainers[ i ] ) );
  }
})();