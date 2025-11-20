import { collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc, getDocs } from 'firebase/firestore'
import { db } from '../firebase/init'

export async function addCategory(payload){
  await addDoc(collection(db,'categories'), payload)
}

export function getCategoriesRealtime(setter){
  return onSnapshot(collection(db,'categories'), snap=>{
    const arr=[]
    snap.forEach(doc=> arr.push({ id: doc.id, ...doc.data() }))
    arr.sort((a,b)=> a.name.localeCompare(b.name))
    setter(arr)
  })
}

export async function getCategoriesOnce(){
  const snap = await getDocs(collection(db,'categories'))
  const arr = []
  snap.forEach(d=> arr.push({ id: d.id, ...d.data() }))
  arr.sort((a,b)=> a.name.localeCompare(b.name))
  return arr
}

export async function updateCategoryDescriptions(id, descriptions){
  const ref = doc(db,'categories',id)
  await updateDoc(ref, { descriptions })
}

export async function removeCategory(id){
  await deleteDoc(doc(db,'categories',id))
}
