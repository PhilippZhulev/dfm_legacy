import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Modal,
  ButtonBlock,
  Margin,
  DeleteModel,
  BusinessCatalogs,
  SystemCatalogs,
  RolesAndAuthorities,
  ChangeOrExitModel,
} from 'components';
import {
  CopyAndCreateModel,
  AddResource,
  RemoveResource,
  CopyResource,
  LinkResource,
  GroupResource,
  CreateWhatIfModel,
  SelectWhatif,
} from 'containers';
import { handleError } from 'helpers';

const defaultState = {
  modalContent: {},
  validation: true,
};

/**
 * Инициализация модалок
 * @component
 * @public
 */
function InitModals({ modal, dispatchModal, userData }) {
  const [state, setState] = useState(defaultState);
  const modalRef = useRef(null);

  /**
   * ANCHOR: Закрыть модалку
   * @public
   */
  const _handleClose = async () => {
    if (modalRef?.current?.cancelCallback) {
      modalRef?.current?.cancelCallback(modal);
    }
    setState(defaultState);
    try {
      dispatchModal({
        type: '',
        state: false,
        title: '',
        buttonText: '',
        text: '',
        titleSize: 'auto',
        hideButton: false,
        cross: false,
        params: {},
        done: () => {},
      });
    } catch (e) {
      handleError('@InitModals/_handleClose', e);
    }
  };

  // Представление
  return (
    <Modal
      open={modal.state}
      close={() => _handleClose()}
      title={
        modal.title ? (
          <div style={{ width: modal.titleSize }}>{modal.title}</div>
        ) : (
          ''
        )
      }
      text={modal.text}
      cross={modal.cross}
      noMaxWidth={
        modal.type === 'rolesAndAuthorities' ||
        modal.type === 'businessCatalogs'
      }>
      <div style={{ width: '100%' }}>
        {modal.type === 'copyModel' || modal.type === 'createModel' ? (
          <CopyAndCreateModel
            type={modal.type}
            onValidate={(e) => setState({ ...state, validation: e })}
            callback={(e) => setState({ ...state, modalContent: e })}
          />
        ) : null}

        {modal.type === 'deleteModel' ? (
          <DeleteModel
            callback={(e) => setState({ ...state, modalContent: e })}
          />
        ) : null}

        {modal.type === 'addResource' ? (
          <AddResource
            callback={(e) => setState({ ...state, modalContent: e })}
          />
        ) : null}

        {modal.type === 'removeResource' ? (
          <RemoveResource
            callback={(e) => setState({ ...state, modalContent: e })}
          />
        ) : null}

        {modal.type === 'copyResource' ? (
          <CopyResource
            cat={modal.cat}
            callback={(e) => setState({ ...state, modalContent: e })}
          />
        ) : null}

        {modal.type === 'linkResource' ? (
          <LinkResource
            callback={(e) => setState({ ...state, modalContent: e })}
          />
        ) : null}

        {modal.type === 'groupResource' ? (
          <GroupResource
            callback={(e) => setState({ ...state, modalContent: e })}
          />
        ) : null}

        {modal.type === 'systemCatalogs' && <SystemCatalogs />}

        {modal.type === 'rolesAndAuthorities' && <RolesAndAuthorities />}

        {modal.type === 'businessCatalogs' && <BusinessCatalogs />}

        {(modal.type === 'createWhatIfCurrent' ||
          modal.type === 'createWhatIf') && (
          <CreateWhatIfModel
            onValidate={(e) => setState({ ...state, validation: e })}
            type={modal.type}
            callback={(e, validation) =>
              setState({ modalContent: e, validation })
            }
            params={modal.params}
          />
        )}

        {modal.type === 'exitWithoutSave' && <ChangeOrExitModel />}
        {modal.type === 'selectWhatif' ? (
          <SelectWhatif
            callback={(e) => setState({ ...state, modalContent: e })}
          />
        ) : null}

        {!modal.hideButton ? (
          <ButtonBlock>
            <Margin right={15}>
              <Button
                onClick={() => {
                  if (modalRef?.current?.applyCallback) {
                    modalRef?.current?.applyCallback(modal);
                  }
                  modal.done(state.modalContent, _handleClose);
                  setState(defaultState);
                }}
                top={1}
                disabled={!state.validation}
                position='left'
                red
                text={modal.buttonText}
              />
            </Margin>

            <Button
              onClick={_handleClose}
              top={1}
              position='left'
              text='Отмена'
            />
          </ButtonBlock>
        ) : null}
      </div>
    </Modal>
  );
}

// Типы props
InitModals.propTypes = {
  modal: PropTypes.object,
  dispatchModal: PropTypes.func.isRequired,
  userData: PropTypes.object.isRequired,
};

InitModals.defaultProps = {
  children: () => {},
  modal: {},
};

export default InitModals;
