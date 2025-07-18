import { CLIENT_ACTIONS } from '@dotcms/client';
import { DotCMSContentlet } from '@dotcms/dotcms-models';
import { InfoPage } from '@dotcms/ui';

import { CommonErrors, DialogStatus, FormStatus } from './enums';

import { DotPageApiParams } from '../services/dot-page-api.service';

export interface MessagePipeOptions {
    message: string;
    args: string[];
}

export interface UnlockOptions {
    inode: string;
    loading: boolean;
    info: MessagePipeOptions;
    disabled: boolean;
}

export interface InfoOptions {
    icon: string;
    info: MessagePipeOptions;
    id: string;
    actionIcon?: string;
}

export interface VTLFile {
    inode: string;
    name: string;
}

export interface ClientData {
    contentlet?: ContentletPayload;
    container: ContainerPayload;
    newContentlet?: ContentletPayload;
    vtlFiles?: VTLFile[];
}

export interface PositionPayload extends ClientData {
    position?: 'before' | 'after';
}

export interface ReorderPayload {
    reorderUrl: string;
}

export interface ActionPayload extends PositionPayload {
    language_id: string;
    pageContainers: PageContainer[];
    pageId: string;
    personaTag?: string;
    newContentletId?: string;
}

export interface PageContainer {
    personaTag?: string;
    identifier: string;
    uuid: string;
    contentletsId: string[];
    acceptTypes?: string;
    maxContentlets?: number;
    variantId?: string;
}

export interface ContainerPayload {
    acceptTypes: string;
    identifier: string;
    contentletsId?: string[];
    maxContentlets: number;
    variantId: string;
    uuid: string;
}

export interface ContentletPayload {
    identifier: string;
    inode: string;
    title: string;
    contentType: string;
    baseType?: string;
    onNumberOfPages?: number;
}

export interface SetUrlPayload {
    url: string;
}

export interface SavePagePayload {
    pageContainers: PageContainer[];
    params?: DotPageApiParams;
    pageId: string;
    whenSaved?: () => void;
}

export interface NavigationBarItem {
    icon?: string;
    iconURL?: string;
    label: string;
    href?: string;
    id: string;
    isDisabled?: boolean;
    tooltip?: string;
}

export interface MessageInfo {
    summary: string;
    detail: string;
}

export interface WorkflowActionResult extends MessageInfo {
    workflowName: string;
    callback: string;
    args: unknown[];
}

export interface DeletePayload {
    payload: ActionPayload;
    originContainer: ContainerPayload;
    contentletToMove: ContentletPayload;
}

export interface InsertPayloadFromDelete {
    payload: ActionPayload;
    pageContainers: PageContainer[];
    contentletsId: string[];
    destinationContainer: ContainerPayload;
    pivotContentlet: ContentletPayload;
    positionToInsert: 'before' | 'after';
}

export interface BasePayload {
    type: 'contentlet' | 'content-type' | 'temp';
}

export interface TempDragPayload extends BasePayload {
    type: 'temp';
}

export interface ContentletDragPayload extends BasePayload {
    type: 'contentlet';
    item: {
        container?: ContainerPayload;
        contentlet: ContentletPayload;
    };
    move: boolean;
}

export interface DragDataset extends BasePayload {
    item: string;
}

export interface DragDatasetItem {
    container?: ContainerPayload;
    contentlet?: ContentletPayload;
    contentType?: {
        variable: string;
        name: string;
        baseType: string;
    };
    move: boolean;
}

// Specific  interface when type is 'content-type'
export interface ContentTypeDragPayload extends BasePayload {
    type: 'content-type';
    item: {
        variable: string;
        name: string;
    };
}

export type DraggedPayload = ContentletDragPayload | ContentTypeDragPayload | TempDragPayload;

export interface SaveInlineEditing {
    contentlet: { [fieldName: string]: string; inode: string };
    params: DotPageApiParams;
}

export interface DotPage {
    title: string;
    identifier: string;
    inode: string;
    canEdit: boolean;
    canRead: boolean;
    canSeeRules: boolean;
    canLock?: boolean;
    locked?: boolean;
    lockedBy?: string;
    lockedByName?: string;
    pageURI: string;
    rendered?: string;
    contentType: string;
    live: boolean;
    liveInode?: string;
    stInode?: string;
    working?: boolean;
    workingInode?: string;
    hasLiveVersion?: boolean;
}

export type CommonErrorsInfo = Record<CommonErrors, InfoPage>;

export interface DialogForm {
    status: FormStatus;
    isTranslation: boolean;
}

export type DialogType = 'content' | 'form' | 'widget' | null;

export interface EditEmaDialogState {
    header: string;
    status: DialogStatus;
    url: string;
    type: DialogType;
    actionPayload?: ActionPayload;
    form: DialogForm;
    clientAction: CLIENT_ACTIONS;
}

export type DialogActionPayload = Pick<EditEmaDialogState, 'actionPayload'>;

export interface DialogAction
    extends Pick<EditEmaDialogState, 'actionPayload' | 'form' | 'clientAction'> {
    event: CustomEvent;
}

// We can modify this if we add more events, for now I think is enough
export interface CreateFromPaletteAction extends DialogActionPayload {
    variable: string;
    name: string;
    language_id?: string | number;
}

export type EditContentletPayload = Partial<
    DotCMSContentlet & Pick<EditEmaDialogState, 'clientAction'>
>;

export interface CreateContentletAction extends DialogActionPayload {
    url: string;
    contentType: string;
}

export interface AddContentletAction extends DialogActionPayload {
    containerId: string;
    acceptTypes: string;
    language_id: string;
}

export interface PostMessage {
    action: CLIENT_ACTIONS;
    payload: unknown;
}

export interface ReorderMenuPayload {
    startLevel: number;
    depth: number;
}

export type DotPageAssetParams = DotPageApiParams;
