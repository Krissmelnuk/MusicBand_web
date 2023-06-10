export interface SnackMessageModel {
    messages: string[];
    type: 'success' | 'info' | 'warning' | 'error'
}