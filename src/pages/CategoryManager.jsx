import React, { useEffect, useState } from 'react';
import {
  addCategory,
  getCategoriesRealtime,
  updateCategoryDescriptions,
  removeCategory
} from '../utils/categories';

export default function CategoryManager() {
  const [name, setName] = useState('');
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState(null);
  const [newDesc, setNewDesc] = useState('');

  useEffect(() => {
    const unsub = getCategoriesRealtime(setCategories);
    return () => unsub();
  }, []);

  async function createCategory() {
    if (!name) return;
    await addCategory({ name, descriptions: [] });
    setName('');
  }

  async function addDesc() {
    if (!selected || !newDesc) return;
    await updateCategoryDescriptions(selected.id, [
      ...selected.descriptions,
      newDesc
    ]);
    setNewDesc('');
  }

  async function delCategory(id) {
    if (!confirm('Delete category?')) return;
    await removeCategory(id);
  }

  return (
    <div className="grid md:grid-cols-2 gap-4">

      {/* Left: Create / List Categories */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="font-semibold mb-3">Create category</h2>

        <div className="flex gap-2">
          <input
            className="flex-1 p-2 border rounded"
            placeholder="Category name"
            value={name}
            onChange={e => setName(e.target.value)}
          />

          <button
            className="px-4 bg-teal-500 text-white rounded"
            onClick={createCategory}
          >
            Add
          </button>
        </div>

        <h3 className="mt-4 font-semibold">Existing</h3>

        <ul className="mt-2 space-y-2">
          {categories.map(c => (
            <li
              key={c.id}
              className="p-2 border rounded flex justify-between items-center"
            >
              <span
                onClick={() => setSelected(c)}
                className="cursor-pointer"
              >
                {c.name}
              </span>

              <button
                className="text-sm text-red-600"
                onClick={() => delCategory(c.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Right: Edit Category Descriptions */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="font-semibold mb-3">Edit descriptions</h2>

        {selected ? (
          <>
            <div className="mb-2">
              Descriptions for <b>{selected.name}</b>
            </div>

            <ul className="space-y-1 mb-2">
              {selected.descriptions.map((d, i) => (
                <li
                  key={i}
                  className="p-2 border rounded flex justify-between"
                >
                  {d}

                  <button
                    className="text-sm text-red-600"
                    onClick={async () => {
                      const arr = selected.descriptions.filter(x => x !== d);
                      await updateCategoryDescriptions(selected.id, arr);
                    }}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex gap-2">
              <input
                className="flex-1 p-2 border rounded"
                placeholder="New description"
                value={newDesc}
                onChange={e => setNewDesc(e.target.value)}
              />

              <button
                className="px-4 bg-teal-500 text-white rounded"
                onClick={addDesc}
              >
                Add
              </button>
            </div>
          </>
        ) : (
          <div>Select a category to edit</div>
        )}
      </div>
    </div>
  );
}
