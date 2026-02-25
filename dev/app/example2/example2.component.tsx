import './example2.styles.css';
import { Component, createSignal, Index, Show } from 'solid-js';
import { Modal, type ModalRef } from 'src/modal';

type Company = { name: string; contactName: string; countryName: string };

export var Example2: Component = () => {
  let modalRef: ModalRef | null = null;

  var companies: Company[] = [
    {
      name: 'Alfreds Futterkiste',
      contactName: 'Maria Anders',
      countryName: 'Germany',
    },
    {
      name: 'Centro comercial Moctezuma',
      contactName: 'Francisco Chang',
      countryName: 'Mexico',
    },
    {
      name: 'Ernst Handel',
      contactName: 'Roland Mendel',
      countryName: 'Austria',
    },
    {
      name: 'Island Trading',
      contactName: 'Helen Bennett',
      countryName: 'UK',
    },
    {
      name: 'Laughing Bacchus Winecellars',
      contactName: 'Yoshi Tannamuri',
      countryName: 'Canada',
    },
    {
      name: 'Magazzini Alimentari Riuniti',
      contactName: 'Giovanni Rovelli',
      countryName: 'Italy',
    },
  ];

  var { 0: selectedCompany, 1: setSelectedCompany } = createSignal<Company | null>(null);

  return (
    <section>
      <h1>Example 2</h1>

      <table>
        <thead>
          <tr>
            <th>Company</th>
            <th>Contact</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          <Index each={companies}>
            {(company) => {
              return (
                <tr
                  onClick={() => {
                    setSelectedCompany(company);
                    modalRef!.showModal();
                  }}
                  style={{
                    cursor: 'pointer',
                  }}
                >
                  <td>{company().name}</td>
                  <td>{company().contactName}</td>
                  <td>{company().countryName}</td>
                </tr>
              );
            }}
          </Index>
        </tbody>
      </table>

      <Modal
        ref={modalRef!}
        class="animation"
        style="inline-size: 90vw; block-size: 50vh;"
        shouldCloseOnBackdropClick
      >
        <div>
          <button
            type="button"
            onClick={() => {
              modalRef!.close();
            }}
          >
            close
          </button>

          <Show
            when={selectedCompany()}
            fallback={
              <div>
                <h1>No company selected!</h1>
              </div>
            }
          >
            {(company) => (
              <table>
                <tbody>
                  <tr>
                    <td>{company().name}</td>
                    <td>{company().contactName}</td>
                    <td>{company().countryName}</td>
                  </tr>
                </tbody>
              </table>
            )}
          </Show>
        </div>
      </Modal>
    </section>
  );
};
