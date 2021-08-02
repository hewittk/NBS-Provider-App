async function initialize()
{
  let patient_id = "smart-1288992"
  let open_url = "https://api.logicahealth.org/nbstest2/open/"
  let diag_url = open_url + "DiagnosticReport?subject=" + patient_id
  let response = await fetch(diag_url);
  let diag_rep = await response.json();
  let results = diag_rep.entry[0].resource.result

  results.forEach(async (r, i) => {
    let url = open_url + r.reference
    let response = await fetch(url)
    let obs = await response.json();
    parseObservation(JSON.stringify(obs, null, 3))
  }
  )
}

async function parseObservation(obs)
{
  let pre = document.getElementById("resources");
  pre.innerHTML += obs + "<br><br>"
}
