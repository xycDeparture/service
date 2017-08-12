import React, { Component, PropTypes } from 'react'
import styles from './styles.scss'

export default class TextField extends Component {
    static propTypes = {
        hintText: PropTypes.any,
        rows: PropTypes.any,
        onChange: PropTypes.any,
        value: PropTypes.any,
        style: PropTypes.any,
        multiLine: PropTypes.any,
        maxLength: PropTypes.any,
        onInput: PropTypes.any
    }
    render() {
        return (
            <div className={styles.myTextfield}>
                <textarea
                    onChange={this.props.onChange}
                    value={this.props.value}
                    style={this.props.style}
                    rows={this.props.rows}
                    placeholder={this.props.hintText}
                    maxLength={this.props.maxLength}
                    onInput={this.props.onInput}
                >
                </textarea>
            </div>
        )
    }
}
