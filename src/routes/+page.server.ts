// const branches = ['LALAPORT BBCC', 'Econsave, Balakong', 'Leisure Mall, Cheras', 'Terminal One, Seremban', 'Aeon Big, Tun Hussein Onn',
// 'Aeon Big, Ampang', 'CS Bangi, Bangi', 'Petronas, Gelang Patah-NB', 'IOI City Mall, Putrajaya', 'Jalan Bunus, Masjid India',
// 'R&R, Gelang Patah-NB', 'R&R, Gelang Patah-SB', 'LARKIN SENTRAL', 'PETRON GELANG PATAH'];

const branches: any = {
  '16': 'LALAPORT BBCC',
  '1': 'Econsave, Balakong',
  '2': 'Leisure Mall, Cheras',
  '3': 'Terminal One, Seremban',
  '4': 'Aeon Big, Tun Hussein Onn',
  '5': 'Aeon Big, Ampang',
  '6': 'CS Bangi, Bangi',
  '8': 'Petronas, Gelang Patah-NB',
  '10': 'IOI City Mall, Putrajaya',
  '11': 'Jalan Bunus, Masjid India',
  '12': 'R&R, Gelang Patah-NB',
  '13': 'R&R, Gelang Patah-SB',
  '14': 'LARKIN SENTRAL',
  '15': 'PETRON GELANG PATAH'
}

/** @type {import('./$types').PageLoad} */
export async function load() {
  const url = 'https://fx.tajmuhabath.com.my/rbapi/WebRbService.svc/json/getbranchesapi/';
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type':'application/json',
    },
    body: JSON.stringify({
      pass_word: "Password@RB1234",
      user_name: "rateboard"
    })
  });
  const { branchDetails } = await res.json();
  let ls: any[] = branchDetails;
  const x = ls.pop();
  ls.unshift(x);
  const la = ls.filter((a) => a.BranchID !== '7' && a.BranchID !== '9');
  let lm = [];
  for (let i = 0; i < la.length; i++) {
    const a = la[i].BranchID;
    const b = {
      ...la[i],
      name: branches[a]
    };
    lm.push(b);
  }
	return {
		result: lm
	};
}
