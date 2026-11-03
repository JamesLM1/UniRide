import {Plus} from 'lucide-react';
import {faqs} from '@/lib/articles';
export function FAQ(){return <div className="faq-list">{faqs.slice(0,6).map(f=><details key={f.q}><summary>{f.q}<Plus size={19}/></summary><p>{f.a}</p></details>)}</div>}
