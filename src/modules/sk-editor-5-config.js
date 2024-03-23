import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';
import { Alignment } from '@ckeditor/ckeditor5-alignment';
import { Autoformat } from '@ckeditor/ckeditor5-autoformat';
import { Bold, Code, Italic, Strikethrough, Subscript, Superscript, Underline } from '@ckeditor/ckeditor5-basic-styles';
import { BlockQuote } from '@ckeditor/ckeditor5-block-quote';
import { CaseChange } from '@ckeditor/ckeditor5-case-change';
import { CKBox, CKBoxImageEdit } from '@ckeditor/ckeditor5-ckbox';
import { CloudServices } from '@ckeditor/ckeditor5-cloud-services';
import { CodeBlock } from '@ckeditor/ckeditor5-code-block';
import { TableOfContents } from '@ckeditor/ckeditor5-document-outline';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { ExportPdf } from '@ckeditor/ckeditor5-export-pdf';
import { ExportWord } from '@ckeditor/ckeditor5-export-word';
import { FindAndReplace } from '@ckeditor/ckeditor5-find-and-replace';
import { Font } from '@ckeditor/ckeditor5-font';
import { FormatPainter } from '@ckeditor/ckeditor5-format-painter';
import { GeneralHtmlSupport } from '@ckeditor/ckeditor5-html-support';
import { Heading } from '@ckeditor/ckeditor5-heading';
import { Highlight } from '@ckeditor/ckeditor5-highlight';
import { HorizontalLine } from '@ckeditor/ckeditor5-horizontal-line';
import { HtmlEmbed } from '@ckeditor/ckeditor5-html-embed';
import { AutoImage,
    Image,
    ImageCaption,
    ImageInsert,
    ImageResize,
    ImageStyle,
    ImageToolbar,
    ImageUpload,
    PictureEditing
} from '@ckeditor/ckeditor5-image';
import { ImportWord } from '@ckeditor/ckeditor5-import-word';
import { Indent, IndentBlock } from '@ckeditor/ckeditor5-indent';
import { AutoLink, Link, LinkImage } from '@ckeditor/ckeditor5-link';
import { List, ListProperties, TodoList } from '@ckeditor/ckeditor5-list';
import { MediaEmbed } from '@ckeditor/ckeditor5-media-embed';
import { Mention } from '@ckeditor/ckeditor5-mention';
import { PageBreak } from '@ckeditor/ckeditor5-page-break';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { PasteFromOffice } from '@ckeditor/ckeditor5-paste-from-office';
import { RemoveFormat } from '@ckeditor/ckeditor5-remove-format';
import { ShowBlocks } from '@ckeditor/ckeditor5-show-blocks';
import { SlashCommand } from '@ckeditor/ckeditor5-slash-command';
import { SourceEditing } from '@ckeditor/ckeditor5-source-editing';
import { SpecialCharacters, SpecialCharactersEssentials } from '@ckeditor/ckeditor5-special-characters';
import { Style } from '@ckeditor/ckeditor5-style';
import { Table, TableCaption, TableCellProperties, TableColumnResize, TableProperties, TableToolbar } from '@ckeditor/ckeditor5-table';
import { Template } from '@ckeditor/ckeditor5-template';
import { TextTransformation } from '@ckeditor/ckeditor5-typing';
import { WordCount } from '@ckeditor/ckeditor5-word-count';
import WProofreader from '@webspellchecker/wproofreader-ckeditor5/src/wproofreader';


ClassicEditor
    .create( document.querySelector( '#full-featured-editor' ), {
        // ckbox: {
        //     // This editor configuration includes the CKBox feature.
        //     // Provide correct configuration values to use it.
        //     tokenUrl: 'https://example.com/cs-token-endpoint'
        //     // Read more about CKBox - https://ckeditor.com/docs/ckeditor5/latest/features/images/image-upload/ckbox.html.
        //     // For other image upload methods see the guide - https://ckeditor.com/docs/ckeditor5/latest/features/images/image-upload/image-upload.html.
        // },
        plugins: [
            Autoformat, BlockQuote, Bold, Heading, Image, ImageCaption, FormatPainter,
            ImageStyle, ImageToolbar, Indent, Italic, Link, List, MediaEmbed,
            Paragraph, Table, TableToolbar, Alignment, AutoImage, AutoLink,
            CaseChange,
            // CKBox, CKBoxImageEdit,
            CloudServices, Code, CodeBlock, Essentials,
            FindAndReplace, Font, Highlight, HorizontalLine,
            HtmlEmbed, ImageInsert, ImageResize, ImageUpload, IndentBlock, GeneralHtmlSupport,
            LinkImage, ListProperties, TodoList, Mention, PageBreak, PasteFromOffice,
            // PasteFromOfficeEnhanced,
            PictureEditing, RemoveFormat, ShowBlocks, SlashCommand, SourceEditing,
            SpecialCharacters, SpecialCharactersEssentials, Style, Strikethrough, Subscript, Superscript,
            TableCaption, TableCellProperties, TableColumnResize,
            TableProperties, TableOfContents, Template, TextTransformation,
            Underline, WordCount,
            // WProofreader
        ],
        toolbar: {
            items: [
                'undo', 'redo',
                '|',
                '|',
                'showBlocks', 'formatPainter', 'findAndReplace', 'selectAll',
                // 'wproofreader',
                '|',
                'heading',
                '|',
                'style',
                '|',
                'fontSize', 'fontFamily',
                {
                    label: 'Font color',
                    icon: 'plus',
                    items: [ 'fontColor', 'fontBackgroundColor' ]
                },
                '|',
                'caseChange',
                '-',
                'bold', 'italic', 'underline',
                {
                    label: 'Formatting',
                    icon: 'text',
                    items: [ 'strikethrough', 'subscript', 'superscript', 'code', 'horizontalLine', '|', 'removeFormat' ]
                },
                'specialCharacters', 'pageBreak',
                '|',
                'link', 'insertImage',
                // 'ckbox',
                'insertTable', 'tableOfContents', 'insertTemplate',
                {
                    label: 'Insert',
                    icon: 'plus',
                    items: [ 'highlight', 'blockQuote', 'mediaEmbed', 'codeBlock', 'htmlEmbed' ]
                },
                '|',
                'alignment',
                '|',
                'bulletedList',	'numberedList',	'todoList', 'outdent', 'indent',
                '|',
                'sourceEditing'
            ],
            shouldNotGroupWhenFull: true
        },
        htmlSupport: {
            allow: [
                {
                    name: /^.*$/,
                    styles: true,
                    attributes: true,
                    classes: true
                }
            ]
        },
        style: {
            definitions: [
                {
                    name: 'Article category',
                    element: 'h3',
                    classes: [ 'category' ]
                },
                {
                    name: 'Title',
                    element: 'h2',
                    classes: [ 'document-title' ]
                },
                {
                    name: 'Subtitle',
                    element: 'h3',
                    classes: [ 'document-subtitle' ]
                },
                {
                    name: 'Info box',
                    element: 'p',
                    classes: [ 'info-box' ]
                },
                {
                    name: 'Side quote',
                    element: 'blockquote',
                    classes: [ 'side-quote' ]
                },
                {
                    name: 'Marker',
                    element: 'span',
                    classes: [ 'marker' ]
                },
                {
                    name: 'Spoiler',
                    element: 'span',
                    classes: [ 'spoiler' ]
                },
                {
                    name: 'Code (dark)',
                    element: 'pre',
                    classes: [ 'fancy-code', 'fancy-code-dark' ]
                },
                {
                    name: 'Code (bright)',
                    element: 'pre',
                    classes: [ 'fancy-code', 'fancy-code-bright' ]
                }
            ]
        },
        fontFamily: {
            supportAllValues: true
        },
        fontSize: {
            options: [ 10, 12, 14, 'default', 18, 20, 22 ],
            supportAllValues: true
        },
        htmlEmbed: {
            showPreviews: true
        },
        image: {
            styles: [
                'alignCenter',
                'alignLeft',
                'alignRight'
            ],
            resizeOptions: [
                {
                    name: 'resizeImage:original',
                    label: 'Original',
                    value: null
                },
                {
                    name: 'resizeImage:50',
                    label: '50%',
                    value: '50'
                },
                {
                    name: 'resizeImage:75',
                    label: '75%',
                    value: '75'
                }
            ],
            toolbar: [
                'imageTextAlternative', 'toggleImageCaption', '|',
                'imageStyle:inline', 'imageStyle:wrapText', 'imageStyle:breakText', '|',
                'resizeImage', '|',
                // 'ckboxImageEdit'
            ]
        },
        list: {
            properties: {
                styles: true,
                startIndex: true,
                reversed: true
            }
        },
        link: {
            decorators: {
                addTargetToExternalLinks: true,
                defaultProtocol: 'https://',
                toggleDownloadable: {
                    mode: 'manual',
                    label: 'Downloadable',
                    attributes: {
                        download: 'file'
                    }
                }
            }
        },
        mention: {
            feeds: [
                {
                    marker: '@',
                    feed: [
                        '@apple', '@bears', '@brownie', '@cake', '@cake', '@candy', '@canes', '@chocolate', '@cookie', '@cotton', '@cream',
                        '@cupcake', '@danish', '@donut', '@dragée', '@fruitcake', '@gingerbread', '@gummi', '@ice', '@jelly-o',
                        '@liquorice', '@macaroon', '@marzipan', '@oat', '@pie', '@plum', '@pudding', '@sesame', '@snaps', '@soufflé',
                        '@sugar', '@sweet', '@topping', '@wafer'
                    ],
                    minimumCharacters: 1
                }
            ]
        },
        template: {
            definitions: [
                {
                    title: 'The title of the template',
                    description: 'A longer description of the template',
                    data: '<p>Data inserted into the content</p>'
                },
                {
                    // ...
                },
                // More template definitions.
                // ...
            ]
        },
        placeholder: 'Type or paste your content here!',
        table: {
            contentToolbar: [
                'tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties', 'toggleTableCaption'
            ]
        },
        // wproofreader: {
        //     // PROVIDE CORRECT VALUE HERE:
        //     serviceId: 'service ID',
        //     lang: 'auto',
        //     srcUrl: 'https://svc.webspellchecker.net/spellcheck31/wscbundle/wscbundle.js'
        // },
        licenseKey: 'your-license-key' // not work
        // PROVIDE CORRECT VALUES HERE
    } )
    .then( editor => {
        window.editor = editor;
        // Prevent showing a warning notification when user is pasting a content from MS Word or Google Docs.
        window.preventPasteFromOfficeNotification = true;

        document.querySelector( '.ck.ck-editor__main' ).appendChild( editor.plugins.get( 'WordCount' ).wordCountContainer );
    } )
    .catch( err => {
        console.error( err );
    } );

export const CKEditorConfig = ClassicEditor