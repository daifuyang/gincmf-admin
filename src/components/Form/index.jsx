import React, { useState, useRef, useEffect, useReducer } from 'react';
import { Input, Button, Row, Col } from 'antd';
import ModalImages from '@/pages/utils/modal/assets/components/preview/images';
import AssetsModal from '@/pages/utils/modal/assets';
import { CloudUploadOutlined, CloseOutlined } from '@ant-design/icons';
import { Editor } from '@tinymce/tinymce-react';
import styles from './form.less';

// import { Editor } from '@tinymce/tinymce-react';
/* eslint-disable */
/**
 * 自定义图片上传控件
 * data [ file_path,prev_path ]
 */
const AssetsInput = (props) => {
    const { value = '', onChange, type = 'image', path } = props;

    const [prevPath, setPrevPath] = useState(path);

    const assetsRef = useRef();

    useEffect(() => {
        console.log(path)
        if (path) {
            setPrevPath(path)
        }
    }, [path])

    const openAssetsModal = () => {
        assetsRef.current.modalVisible(true, type);
    };

    const onAssetsModalOk = (data) => {
        setPrevPath(data.prev_path);
        if (onChange) {
            onChange(data.file_path);
        }
    };

    const deleteImage = (ev) => {
        setPrevPath("");
        if (onChange) {
            onChange("");
        }
        ev.stopPropagation()
    }

    const getImage = () => {
        if (prevPath === '' || prevPath === undefined) {
            return <div className="upload" onClick={openAssetsModal}>
                <CloudUploadOutlined style={{ fontSize: '1.5rem' }} />
                <div className="ant-upload-text">上传图片</div>
            </div>
        }
        return (
            <div
                style={{ width: '200px', border: '1px solid #d9d9d9' }}
                className={`thumbnail-preview ${styles.relative}`}
                onClick={openAssetsModal}
            >
                <img src={prevPath} alt="" />

                <div onClick={deleteImage} className={styles.thumbnailImg} >
                    <CloseOutlined />
                </div>

            </div>
        )
    }

    const getAudio = () => {
        if (prevPath === '' || prevPath === undefined) {
            return (
                <div className="upload" onClick={openAssetsModal}>
                    <CloudUploadOutlined style={{ fontSize: '1.5rem' }} />
                    <div className="ant-upload-text">上传音频</div>
                </div>
            )
        }

        return (
            <div className="audio-preview d-flex align-items-center">
                <audio className="mr-2" controls src={prevPath}>
                    <track kind="captions" />
                </audio>

                <Button onClick={openAssetsModal} type="primary" icon={<CloudUploadOutlined />}>
                    上传
            </Button>
            </div>)
    }

    const getVideo = () => {
        if (prevPath === '' || prevPath === undefined) {
            return (
                <div className="upload" onClick={openAssetsModal}>
                    <CloudUploadOutlined style={{ fontSize: '1.5rem' }} />
                    <div className="ant-upload-text">上传视频</div>
                </div>
            )
        }
        return (
            <>
                <div className="audio-preview d-flex align-items-center">
                    <video
                        style={{ outline: 'none', width: '100%' }}
                        className="mr-2"
                        controls
                        src={prevPath}
                    >
                        <track kind="captions" />
                    </video>

                    <Button onClick={openAssetsModal} type="primary" icon={<CloudUploadOutlined />}>
                        上传
                    </Button>
                </div>
            </>
        )
    }

    return (
        <>
            <AssetsModal ref={assetsRef} onOk={onAssetsModalOk} />
            <Input value={value} style={{ display: 'none' }} />
            {(() => {
                if (type === "image") {
                    return getImage()
                }
                if (type === "audio") {
                    return getAudio()
                }
                if (type === "video") {
                    return getVideo()
                }
            })()}
        </>
    )
}

// 图片多选组件
const AssetsMultInput = ({ value = [], type = "image", onChange }) => {

    const [multiple, setMultiple] = useState(false);
    const assetsRef = useRef();

    const [visible, setVisible] = useState(false);
    const [index, setIndex] = useState(0);

    const [actionType, setActionType] = useState("");
    const [editIndex, setEditIndex] = useState(0);

    const [assets, dispatch] = useReducer((state, action) => {

        let temp = [...state]
        const { data } = action

        switch (action.type) {
            case 'init':
                temp = [...data];
                break;
            case 'add':
                data.forEach((item) => {
                    temp.push(item);
                });
                break;
            case 'edit':
                console.log(editIndex, data)
                temp[editIndex] = data;
                break;
            case 'delete':
                temp.splice(data, 1);
                break;
            default:
                break;
        }

        return temp;

    }, [])

    useEffect(() => {
        if (onChange) {
            onChange(assets)
        }
    }, [assets])

    const openAssetsModal = () => {
        setMultiple(true);
        assetsRef.current.modalVisible(true, type);
        setActionType('add');
    };

    const openPreview = (i) => {
        setVisible(true);
        setIndex(i);
    };

    const onAssetsModalOk = (data = []) => {

        dispatch({
            type: actionType,
            data
        })

    };

    const handleAssetsEdit = (i, e) => {
        e.stopPropagation();
        setMultiple(false);
        setActionType('edit');
        console.log("i", i);
        setEditIndex(i);
        assetsRef.current.modalVisible(true, type);
    };

    // 
    const handleAssetsDelete = (i, e) => {
        e.stopPropagation()
        console.log("删除索引" + i)
        dispatch({
            type: "delete",
            dadta: i
        })

        if (onChange) {
            onChange(assets)
        }
    };

    const getImage = () => (
        <Row className={styles.multipleImage} gutter={[24, 24]}>
            {value.map((v, i) => (
                <Col key={`image-${i}`} span={6}>
                    <div
                        className={`${styles.imgWrap} img-wrap`}
                        onClick={() => openPreview(i)}
                    >
                        <img src={v.prev_path} alt="" />
                        <div className={`${styles.handleBtn} d-flex`}>
                            <div
                                onClick={(e) => {
                                    handleAssetsEdit(i, e);
                                }}
                                className={`flex-1 ${styles.btnItem}`}
                            >
                                替换
                        </div>
                            <div className={styles.vLine} />
                            <div
                                onClick={(e) => {
                                    handleAssetsDelete(i, e);
                                }}
                                className={`flex-1 ${styles.btnItem}`}
                            >
                                删除
                        </div>
                        </div>
                    </div>
                </Col>
            ))}
            <Col span={6}>
                <div
                    className="upload"
                    onClick={openAssetsModal}>
                    <CloudUploadOutlined style={{ fontSize: '1.5rem' }} />
                    <div className="ant-upload-text">上传图片</div>
                </div>
            </Col>
        </Row>
    )

    const getFile = () => (
        <>
            {
                value.map((v, i) => (
                    <div key={i} className="d-flex">
                        <a className="flex-1" href={v.prev_path}>{v.remark_name}</a>
                        <a style={{ marginRight: "15px" }} onClick={(e) => {
                            handleAssetsEdit(i, e);
                        }}>
                            替换 </a>

                        <a onClick={(e) => {
                            handleAssetsDelete(i, e);
                        }} style={{ color: "#ff4d4f" }}>
                            删除</a>
                    </div>
                ))
            }

            <a onClick={openAssetsModal}>上传资源</a>

        </>
    )

    return (
        <>
            <ModalImages data={assets} index={index} visible={visible} setVisible={setVisible} />
            <AssetsModal multiple={multiple} ref={assetsRef} onOk={onAssetsModalOk} />
            <div>
                {(() => {

                    if (type === "image") {
                        return getImage()
                    }

                    if (type === "file") {
                        return getFile()
                    }

                })()}
            </div>
        </>
    );
};


// 处理富文本上传逻辑
const uploadHandler = (blobInfo, success, failure, progress) => {

    var xhr, formData;

    xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    let token = localStorage.getItem('token');
    if (token) {
        token = JSON.parse(token);
    }

    xhr.open('POST', '/api/admin/assets');

    xhr.setRequestHeader('Authorization', `Bearer ${token.access_token}`);

    xhr.upload.onprogress = function (e) {
        progress(e.loaded / e.total * 100);
    };

    xhr.onload = function () {
        var json;

        if (xhr.status === 403) {
            failure('HTTP Error: ' + xhr.status, { remove: true });
            return;
        }

        if (xhr.status < 200 || xhr.status >= 300) {
            failure('HTTP Error: ' + xhr.status);
            return;
        }

        const result = JSON.parse(xhr.responseText);

        if (result.code === 1) {
            success(result.data[0].prev_path)
            return
        }

        failure(result.msg);

    };

    xhr.onerror = function () {
        failure('Image upload failed due to a XHR Transport error. Code: ' + xhr.status);
    };

    formData = new FormData();
    formData.append('file[]', blobInfo.blob(), blobInfo.filename());

    xhr.send(formData);

}

/**
 * 自定义图文编辑器
 */
const EditorInput = ({ value = '', onChange }) => {

    const triggerChange = (changedValue) => {
        if (onChange) {
            onChange(changedValue);
        }
    };

    return (
        <>
            <Editor
                apiKey="2ozomw3xk36p6rq84y8eahntabuary661qsagp1xcltao398"
                init={{
                    height: 200,
                    menubar: false,
                    plugins: [
                        'advlist autolink lists link image',
                        'charmap print preview anchor help',
                        'searchreplace code',
                        'insertdatetime media table wordcount fullscreen',
                    ],
                    toolbar:
                        'insertfile a11ycheck undo redo |formatselect removeformat lineheight bold italic | forecolor backcolor | fontselect template codesample | alignleft aligncenter alignright alignjustify | bullist numlist | table tableinsertdialog tablecellprops tableprops | link image tinydrive | preview code fullscreen',
                    font_formats: 'minion-pro display,serif;Arial=arial,helvetica,sans-serif; Courier New=courier new,courier,monospace; AkrutiKndPadmini=Akpdmi-n',
                    lineheight_formats: '1 1.1 1.15 1.2 1.3 1.4 1.5 1.6 1.7 1.8 1.9 2',
                    language: 'zh_CN',
                    images_upload_handler: uploadHandler
                }}
                value={value}
                onChange={(e) => {
                    triggerChange(e.target.getContent());
                }}
            />
        </>
    );
};

export { AssetsInput, AssetsMultInput, EditorInput };
