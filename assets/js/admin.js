const Admin = {
  async init(){
    try {
      const res = await fetch('assets/data/calendario.json');
      const data = await res.json();
      this.cal = data.calendario || data;
      this.render();
    } catch(e){
      alert('Error cargando calendario.json');
    }
    document.getElementById('save-cal').addEventListener('click', ()=>this.saveCal());
  },
  render(){
    document.getElementById('show-sem1').checked = this.cal.show_sem1 !== false;
    document.getElementById('show-sem2').checked = this.cal.show_sem2 !== false;
    const container = document.getElementById('cal-sections');
    container.innerHTML = '';
    const sem1 = this.cal['semestre 1'] || this.cal.semestre_1;
    const sem2 = this.cal['semestre 2'] || this.cal.semestre_2;
    if(sem1){
      container.appendChild(this.renderSem('sem1', sem1));
    }
    if(sem2){
      container.appendChild(this.renderSem('sem2', sem2));
    }
  },
  renderSem(key, sem){
    const wrap = document.createElement('div');
    wrap.className = 'p-5 rounded-2xl border-2 border-slate-200 bg-slate-50';
    wrap.innerHTML = `<h3 class="font-black text-lg mb-4">${sem.nombre || key}</h3>`;
    const list = document.createElement('div');
    list.className = 'space-y-3';
    (sem.bloques||[]).forEach((b, idx)=>{
      const row = document.createElement('div');
      row.className = 'grid grid-cols-1 md:grid-cols-4 gap-3 p-3 rounded-xl bg-white border border-slate-200';
      row.innerHTML = `
        <div class="md:col-span-2">
          <label class="text-xs font-bold text-slate-500">Bloque/Módulo</label>
          <input class="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 font-semibold" value="${b.nombre||''}" data-key="${key}" data-idx="${idx}" data-field="nombre">
        </div>
        <div>
          <label class="text-xs font-bold text-slate-500">Inicio</label>
          <input type="date" class="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 font-semibold" value="${b.inicio||''}" data-key="${key}" data-idx="${idx}" data-field="inicio">
        </div>
        <div>
          <label class="text-xs font-bold text-slate-500">Cierre</label>
          <input type="date" class="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 font-semibold" value="${b.cierre||''}" data-key="${key}" data-idx="${idx}" data-field="cierre">
        </div>
      `;
      list.appendChild(row);
    });
    wrap.appendChild(list);
    list.addEventListener('input', (e)=>{
      const inp = e.target;
      if(!inp.dataset.key) return;
      const k = inp.dataset.key;
      const i = parseInt(inp.dataset.idx);
      const f = inp.dataset.field;
      const semObj = k==='sem1' ? (this.cal['semestre 1']||this.cal.semestre_1) : (this.cal['semestre 2']||this.cal.semestre_2);
      if(!semObj) return;
      semObj.bloques[i][f] = inp.value;
    });
    return wrap;
  },
  saveCal(){
    this.cal.show_sem1 = document.getElementById('show-sem1').checked;
    this.cal.show_sem2 = document.getElementById('show-sem2').checked;
    const blob = new Blob([JSON.stringify({calendario: this.cal}, null, 2)], {type:'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'calendario.json';
    a.click();
    URL.revokeObjectURL(url);
    alert('Descargado calendario.json. Reemplázalo en assets/data/calendario.json');
  }
};
document.addEventListener('DOMContentLoaded', ()=>Admin.init());
